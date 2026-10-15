// TJ Broadcast — Existing GitHub Articles + New Supabase Articles

const SUPABASE_URL =
    "https://zempldbvywmoeltqzsnv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_0C4xq5K4vaAYxYKYr6OT-g_5QG5tqVP";

const BLOG_API = `${SUPABASE_URL}/rest/v1/blogs`;

const container = document.getElementById("dynamic-blog-list");

// Existing GitHub articles: display these first.
const existingArticles = Array.from(
    { length: 24 },
    (_, index) => ({
        title: `Blog ${index + 1}`,
        url: `blog/blog-${index + 1}.html`
    })
);

function addArticle(title, url) {
    const link = document.createElement("a");
    link.href = url;
    link.textContent = `📖 ${title}`;

    container.appendChild(link);
}

async function loadPublishedBlogs() {
    if (!container) {
        console.error("Blog container #dynamic-blog-list was not found.");
        return;
    }

    container.replaceChildren();

    // 1. Display the existing GitHub articles first.
    existingArticles.forEach(blog => {
        addArticle(blog.title, blog.url);
    });

    // 2. Append newly published Supabase articles.
    try {
        const response = await fetch(
            `${BLOG_API}?select=id,title,slug,status&status=eq.published&order=created_at.desc`,
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
                addArticle(
                    blog.title,
                    `article.html?slug=${encodeURIComponent(blog.slug)}`
                );
            });
        }
    } catch (error) {
        console.error("Unable to load new Supabase blogs:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadPublishedBlogs);
