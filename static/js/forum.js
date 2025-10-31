// MindfulCampus - Forum Page JavaScript
// Peer support community

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const newPostForm = document.getElementById('newPostForm');
    const postTitle = document.getElementById('postTitle');
    const postContent = document.getElementById('postContent');
    const tagButtons = document.querySelectorAll('.tag-btn');
    const postsContainer = document.getElementById('postsContainer');

    // State
    let selectedTag = null;

    // Tag Selection
    tagButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle selection
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedTag = null;
            } else {
                tagButtons.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                selectedTag = this.dataset.tag;
            }
        });
    });

    // Submit New Post
    if (newPostForm) {
        newPostForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const title = postTitle.value.trim();
            const content = postContent.value.trim();

            if (!content) {
                alert('Please write something before posting.');
                return;
            }

            // Create new post
            const newPost = createPostCard({
                title: title,
                content: content,
                tag: selectedTag || 'support',
                time: 'Just now',
                supports: 0,
                replies: 0
            });

            // Add to top of feed
            const firstPost = postsContainer.querySelector('.post-card');
            if (firstPost) {
                postsContainer.insertBefore(newPost, firstPost);
            } else {
                postsContainer.appendChild(newPost);
            }

            // Animate
            newPost.classList.add('animate-slideDown');

            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'feedback-message success';
            successMsg.textContent = 'Your post has been shared! 💙 The community is here for you.';
            successMsg.style.position = 'fixed';
            successMsg.style.top = '100px';
            successMsg.style.left = '50%';
            successMsg.style.transform = 'translateX(-50%)';
            successMsg.style.zIndex = '10000';
            document.body.appendChild(successMsg);

            setTimeout(() => {
                successMsg.remove();
            }, 4000);

            // Reset form
            newPostForm.reset();
            tagButtons.forEach(b => b.classList.remove('selected'));
            selectedTag = null;
        });
    }

    // Create Post Card
    function createPostCard(post) {
        const card = document.createElement('div');
        card.className = 'glass-card post-card';

        const avatarEmojis = ['🌟', '✨', '🌸', '💫', '🦋', '🌈', '💙', '🌺'];
        const randomEmoji = avatarEmojis[Math.floor(Math.random() * avatarEmojis.length)];

        const titleHTML = post.title ? `<h3 class="post-title">${escapeHtml(post.title)}</h3>` : '';

        card.innerHTML = `
            <div class="post-header">
                <div class="post-avatar">${randomEmoji}</div>
                <div class="post-meta">
                    <div class="post-author">Anonymous Student</div>
                    <div class="post-time">${post.time}</div>
                </div>
                <span class="post-tag tag-${post.tag}">${capitalizeFirst(post.tag)}</span>
            </div>
            <div class="post-content">
                ${titleHTML}
                <p class="post-text">${escapeHtml(post.content)}</p>
            </div>
            <div class="post-footer">
                <button class="post-action support-btn">💙 Support (${post.supports})</button>
                <button class="post-action reply-btn">💬 Reply (${post.replies})</button>
            </div>
        `;

        // Add event listeners
        const supportBtn = card.querySelector('.support-btn');
        const replyBtn = card.querySelector('.reply-btn');

        supportBtn.addEventListener('click', function() {
            const currentCount = parseInt(this.textContent.match(/\d+/)[0]);
            this.textContent = `💙 Support (${currentCount + 1})`;
            this.style.color = 'var(--accent-teal)';
            
            // Animate
            this.classList.add('animate-heartbeat');
            setTimeout(() => {
                this.classList.remove('animate-heartbeat');
            }, 1500);
        });

        replyBtn.addEventListener('click', function() {
            alert('Reply feature coming soon! For now, create a new post to continue the conversation.');
        });

        return card;
    }

    // Utility Functions
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Add interactivity to existing posts
    function initializeExistingPosts() {
        const supportButtons = document.querySelectorAll('.post-action.support-btn, .post-action:first-child');
        supportButtons.forEach(btn => {
            if (btn.textContent.includes('Support')) {
                btn.addEventListener('click', function() {
                    const currentCount = parseInt(this.textContent.match(/\d+/)[0]);
                    this.textContent = `💙 Support (${currentCount + 1})`;
                    this.style.color = 'var(--accent-teal)';
                    this.classList.add('animate-heartbeat');
                    setTimeout(() => {
                        this.classList.remove('animate-heartbeat');
                    }, 1500);
                });
            }
        });

        const replyButtons = document.querySelectorAll('.post-action:last-child');
        replyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                postContent.focus();
            });
        });
    }

    // Initialize
    initializeExistingPosts();
});
