export function getEventSource(href: string): string {
    if (href.startsWith('org/bukkit')) {
        return 'bukkit'
    } else if (href.startsWith('org/spigotmc')) {
        return 'spigot'
    } else if (href.startsWith('com/destroystokyo/paper')) {
        return 'paper'
    }
}