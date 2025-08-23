export const diffDays = (estimate_end:string, end:string): number => {
    const d1 = new Date(estimate_end);
    const d2 = new Date(end);

    const diffDays = (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);

    return diffDays
}