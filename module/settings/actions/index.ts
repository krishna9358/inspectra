"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { deleteWebhook } from "@/module/github/lib/github";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getUserProfile() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateUserProfile(data: {
  name?: string;
  email?: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("Unauthorized");
    }
    const updateUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: data.name,
        email: data.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    revalidatePath("/dashboard/settins", "page");
    return {
      success: true,
      user: updateUser,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error,
    };
  }
}

export async function getConnectRepositories() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("Unauthorized");
    }
    const repositories = await prisma.repository.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        name: true,
        fullName: true,
        url: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return repositories;
  } catch (error) {
    console.log(" error fetchiing connected repositories", error);
    return [];
  }
}

export async function disconnectRepository(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    const repository = await prisma.repository.findUnique({
      where: {
        id: id,
        userId: session.user.id,
      },
    });
    if (!repository) {
      throw new Error("Repository not found");
    }
    await deleteWebhook(repository.owner, repository.name);
    await prisma.repository.delete({
      where: {
        id: id,
        userId: session.user.id,
      },
    });
    revalidatePath("/dashboard/settings", "page");
    revalidatePath("/dashboard/repository", "page");
    return {
      success: true,
    };
  } catch (error) {
    console.log(" error disconnecting repository", error);
    return {
      success: false,
      error: error,
    };
  }
}

export async function disconnectAllRepository() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    const repositories = await prisma.repository.findMany({
      where: {
        userId: session.user.id,
      },
    });
    if (!repositories) {
      throw new Error("Repositories not found");
    }
    await Promise.all(
      repositories.map(async (repository) => {
        await deleteWebhook(repository.owner, repository.name);
      }),
    );
    await prisma.repository.deleteMany({
      where: {
        userId: session.user.id,
      },
    });
    revalidatePath("/dashboard/settings", "page");
    revalidatePath("/dashboard/repository", "page");
    return {
      success: true,
      count: repositories.length,
    };
  } catch (error) {
    console.log(" error disconnecting all repositories", error);
    return {
      success: false,
      error: error,
    };
  }
}
