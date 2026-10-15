// TJ Broadcast — Existing GitHub Articles + Supabase Articles

const SUPABASE_URL =
    "https://zempldbvywmoeltqzsnv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_0C4xq5K4vaAYxYKYr6OT-g_5QG5tqVP";

const BLOG_API = `${SUPABASE_URL}/rest/v1/blogs`;

const container = document.getElementById("dynamic-blog-list");

async function loadExistingArticles() {
    for (let i = 1; i <= 24; i++) {
        const url = `blog/blog-${i}.html`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                console.warn(`Could not load ${url}`);
                continue;
            }

            const html = await response.text();

            const doc = new DOMParser().parseFromString(
                html,
                "text/html"
            );

            // Read the actual title from the HTML file.
            const heading = doc.querySelector(".hero h1, h1");

            const titleFromHeading = heading
                ? heading.textContent.replace(/\s+/g, " ").trim()
                : "";

            const titleFromDocument = doc.querySelector("title")
                ?.textContent
                .replace(/\s*\|\s*TJ Broadcast\s*$/i, "")
                .trim() || "";

            const title =
                titleFromHeading ||
                titleFromDocument ||
                `Blog ${i}`;

            const link = document.createElement("a");

            link.href = url;
            link.textContent = `📖 ${title}`;

            container.appendChild(link);

        } catch (error) {
            console.error(`Error loading ${url}:`, error);
        }
    }
}

async function loadNewSupabaseArticles() {
    try {
        const response = await fetch(
            `${BLOG_API}?select=title,slug&status=eq.published&order=created_at.desc`,
            {
                headers: {
                    apikey: SUPABASE_PUBLISHABLE_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Supabase returned HTTP ${response.status}`);
        }

        const blogs = await response.json();

        if (blogs.length > 0) {
            const heading = document.createElement("h2");
            heading.textContent = "புதிய கட்டுரைகள்";
            container.appendChild(heading);

            blogs.forEach(blog => {
                const link = document.createElement("a");

                link.href =
                    `article.html?slug=${encodeURIComponent(blog.slug)}`;

                link.textContent = `📖 ${blog.title}`;

                container.appendChild(link);
            });
        }
    } catch (error) {
        console.error("Unable to load new articles:", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    if (!container) {
        console.error("Blog list container was not found.");
        return;
    }

    container.replaceChildren();

    await loadExistingArticles();
    await loadNewSupabaseArticles();
});
