export type NixStage = {
    name: string
    message: string
    emoji: string
}

export const getNixStage = (
    progress: number,
): NixStage => {
    if (progress >= 76) {
        return {
            name: "Guardían del Jardín",
            message: "¡Nix está cuidando de tu jardín!",
            emoji: "🐰",
        }
    }

    if (progress >= 51) {
        return {
            name: "Protecctor del Jardín",
            message: "¡Nix empieza a cuidar de tus plantas!",
            emoji: "🐰",
        }
    }

    if (progress >= 26) {
        return {
            name: "Compañero del Jardín",
            message: "!Nix está creciendo contigo!",
            emoji: "🐰",
        }
    }

    if (progress >= 1) {
        return {
            name: "Nix Curioso",
            message: "¡Nix comienza a explorar tu jardín!",
            emoji: "🐰",
        }
    }

    return {
        name: "Nix Explorador", 
        message: "Nix está esperando a descrubir el jardín contigo",
        emoji: "🐰",
    }
}