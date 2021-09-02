export const ENTRY_TYPES = Object.freeze(
    {
        IMAGE: { id: 1, display: 'Image' },
        VIDEO: { id: 2, display: 'Video' },
        MARKDOWN: { id: 3, display: 'Text' },
        LOCATION: { id: 4, display: 'Location' }
    }
)

export const MESSAGE_TYPES = Object.freeze(
    {
        SUCCESS: { id: 1, color: 'green' },
        WARNING: { id: 2, color: 'yellow' },
        DANGER: { id: 3, color: 'red' },
        INFO: { id: 4, display: 'blue' }
    }
)
