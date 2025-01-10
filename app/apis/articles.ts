import type { Article, Author } from "~/types/article";

export async function getNyArticles(queryParams: Record<string, string>) {
    const { date, ...remainingQuery } = queryParams;

    const query = new URLSearchParams({
        'api-key': import.meta.env.VITE_NY_API_KEY,
        ...date && {fq: `pub_date:("${date}")`},
        ...remainingQuery
    }).toString()

    try {
        const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${query}`);
        const list: Article[] = await response.json().then((data) => {
            return data.response.docs.map((doc: any): Article => {
                return {
                    title: doc.headline.main,
                    snippet: doc.snippet,
                    publishedDate: doc.pub_date,
                    section: doc.section_name,
                    url: doc.web_url,
                    source: doc.source,
                    authors: doc.byline.person.map((p: any): Author => ({ 
                        name: `${p.firstname} ${p.lastname}`
                    }))        
                }
            })
        });
        return { list };
    } catch (error) {
        console.error('NY error', error);
        return { list: [] };
    }
}

export async function getGurdianArticles(queryParams: Record<string, string>) {
    const { date, ...remainingQuery } = queryParams;

    const query = new URLSearchParams({
        'api-key': import.meta.env.VITE_GURDIAN_API_KEY,
        ...date && { 'from-date': date, 'to-date': date },
        ...remainingQuery
    }).toString()

    console.log('VITE_GURDIAN_API_KEY query: ', query);

    try {
        const response = await fetch(`https://content.guardianapis.com/search?${query}`);
        const list: Article[] = await response.json().then((data) => {
            return data.response.results.map((doc: any): Article => {
                return {
                    title: doc.webTitle,
                    snippet: '',
                    publishedDate: doc.webPublicationDate,
                    section: doc.sectionName,
                    url: doc.webUrl,
                    source: 'The Guardian',
                    authors: []
                }
            })
        });
        return { list };
    } catch (error) {
        console.error('Gurdian error', error);
        return { list: [] };
    }
}

export async function getNewsApiArticles(queryParams: Record<string, string>) {
    const { date, ...remainingQuery } = queryParams;

    const query = new URLSearchParams({
        'apiKey': import.meta.env.VITE_NEWS_API_KEY,
        ...date && { 'from': date, 'to': date },
        ...remainingQuery
    }).toString()

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?${query}`);
        const list: Article[] = await response.json().then((data) => {
            return data.articles.map((doc: any): Article => {
                return {
                    title: doc.title,
                    snippet: doc.description,
                    publishedDate: doc.publishedAt,
                    section: doc.source.name,
                    url: doc.url,
                    source: doc.source.name,
                    authors: doc.author ? [{ name: doc.author }] : []
                }
            }).filter((article: Article) => article.title !== '[Removed]')
        });
        return { list };
    } catch (error) {
        console.error('NewsApi error', error);
        return { list: [] };
    }
}

export async function getArticles(queryParams: Record<string, string>) {
    return Promise.all([
        getNyArticles(queryParams),
        getGurdianArticles(queryParams),
        getNewsApiArticles(queryParams)
    ]).then(([nyData, gurdianData, newsapiData]) => {
        // sort by published date
        const combinedList = [...nyData.list, ...gurdianData.list, ...newsapiData.list];
        combinedList.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        return { list: combinedList }
    })
}