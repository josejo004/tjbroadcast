// TJ Broadcast â€” Supabase Blog Connection

const SUPABASE_URL = "https://zempldbvywmoeltqzsnv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_0C4xq5K4vaAYxYKYr6OT-g_5QG5tqVP";

const BLOG_API = `${SUPABASE_URL}/rest/v1/blogs`;

async function loadPublishedBlogs() {
    const container = document.getElementById("dynamic-blog-list");

    if (!container) {
        console.error("Blog container #dynamic-blog-list was not found.");
        return;
    }

    container.replaceChildren();

    const loading = document.createElement("p");
    loading.textContent = "à®•à®Ÿà¯à®Ÿà¯à®°à¯ˆà®•à®³à¯ à®à®±à¯à®±à®ªà¯à®ªà®Ÿà¯à®•à®¿à®©à¯à®±à®©...";
    container.appendChild(loading);

    try {
        const response = await fetch(
            `${BLOG_API}?select=id,title,slug,excerpt,featured_image,created_at&status=eq.published&order=created_at.desc`,
            {
                headers: {
                    apikey: SUPABASE_PUBLISHABLE_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                `Supabase returned HTTP ${response.status}`
            );
        }

        const blogs = await response.json();
        container.replaceChildren();

        if (blogs.length === 0) {
            const message = document.createElement("p");
            message.textContent = "à®¤à®±à¯à®ªà¯‹à®¤à¯ à®µà¯†à®³à®¿à®¯à®¿à®Ÿà®ªà¯à®ªà®Ÿà¯à®Ÿ à®•à®Ÿà¯à®Ÿà¯à®°à¯ˆà®•à®³à¯ à®‡à®²à¯à®²à¯ˆ.";
            container.appendChild(message);
            return;
        }

        blogs.forEach(blog => {
            const link = document.createElement("a");

            // Open each article using its existing slug-based URL.
           link.href = `article.html?slug=${encodeURIComponent(blog.slug)}`;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            link.textContent = `ðŸ“– ${blog.title}`;

            container.appendChild(link);
        });

    } catch (error) {
        console.error("Unable to load blogs:", error);

        container.replaceChildren();

        const message = document.createElement("p");
        message.textContent =
            "à®•à®Ÿà¯à®Ÿà¯à®°à¯ˆà®•à®³à¯ˆ à®à®±à¯à®± à®®à¯à®Ÿà®¿à®¯à®µà®¿à®²à¯à®²à¯ˆ. à®šà®¿à®±à®¿à®¤à¯ à®¨à¯‡à®°à®®à¯ à®•à®´à®¿à®¤à¯à®¤à¯ à®®à¯à®¯à®±à¯à®šà®¿à®•à¯à®•à®µà¯à®®à¯.";

        container.appendChild(message);
    }
}

document.addEventListener("DOMContentLoaded", loadPublishedBlogs);// JavaScript Document
