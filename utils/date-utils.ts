export function parseAuctionDateTime(dateString: string): Date {
    return new Date(dateString.replace(/\//g, "-"));
}

export function getTimeUntilAuction(dateString: string) {
    const auctionDate = parseAuctionDateTime(dateString);
    const now = new Date();
    const diffMs = auctionDate.getTime() - now.getTime();

    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    return `${days}d ${hours}h`;
}
