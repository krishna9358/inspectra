start: 
	@bun run dev


build: 
	@bun run build


test:
    @bun run test

format:
    @bun x prettier . --write