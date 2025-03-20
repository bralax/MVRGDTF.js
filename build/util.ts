export function sanitizeName(name?: string): string | undefined {
    return name?.replace("-", "");
}