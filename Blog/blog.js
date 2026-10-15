// TJ Broadcast — Supabase Blog Connection

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
    loading.textContent = "கட்டுரைகள் ஏற்றப்படுகின்றன...";
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
            message.textContent = "தற்போது வெளியிடப்பட்ட கட்டுரைகள் இல்லை.";
            container.appendChild(message);
            return;
        }

        blogs.forEach(blog => {
            const link = document.createElement("a");

            // Open each article using its existing slug-based URL.
            link.href = `blog/${encodeURIComponent(blog.slug)}.html`;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            link.textContent = `📖 ${blog.title}`;

            container.appendChild(link);
        });

    } catch (error) {
        console.error("Unable to load blogs:", error);

        container.replaceChildren();

        const message = document.createElement("p");
        message.textContent =
            "கட்டுரைகளை ஏற்ற முடியவில்லை. சிறிது நேரம் கழித்து முயற்சிக்கவும்.";

        container.appendChild(message);
    }
}

document.addEventListener("DOMContentLoaded", loadPublishedBlogs);// JavaScript Document