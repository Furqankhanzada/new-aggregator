
export type Author = {
    name: string
}

export type Article = {
    title: string
    snippet: string
    publishedDate: string
    section: string
    authors: Author[]
    url: string
    source: string
}