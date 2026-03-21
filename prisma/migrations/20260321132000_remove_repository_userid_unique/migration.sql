-- DropIndex (safe if already removed via `db push`)
DROP INDEX IF EXISTS "repository_userId_key";

-- CreateIndex (safe if already created via `db push`)
CREATE INDEX IF NOT EXISTS "repository_userId_idx" ON "repository"("userId");
