const API_BASE = window.location.origin;
const USER_ID = 'user-' + Math.random().toString(36).substr(2, 9);

// Toast notification utility
class ToastManager {
    constructor() {
        this.container = document.getElementById('toast-container');
    }

    show(message, title = '', type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            error: '❌',
            success: '✅',
            info: 'ℹ️',
            warning: '⚠️'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        this.container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, duration);
    }

    error(message, title = 'エラー') {
        this.show(message, title, 'error');
    }

    success(message, title = '成功') {
        this.show(message, title, 'success');
    }

    info(message, title = 'お知らせ') {
        this.show(message, title, 'info');
    }

    warning(message, title = '警告') {
        this.show(message, title, 'warning');
    }
}

const toast = new ToastManager();

// API Error Handler
async function handleApiResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.error || 'エラーが発生しました');
        error.details = errorData.details;
        error.code = errorData.code;
        error.status = response.status;
        throw error;
    }
    return response.json();
}

class SlackLearningApp {
    constructor() {
        this.categories = [];
        this.lessons = [];
        this.currentLesson = null;
        this.currentCategory = null;
        this.completedLessons = [];
        this.selectedQuizAnswer = null;

        this.init();
    }

    async init() {
        await this.loadCategories();
        await this.loadProgress();
        this.renderCategories();
        this.updateProgress();
    }

    async loadCategories() {
        try {
            const response = await fetch(`${API_BASE}/api/categories`);
            this.categories = await handleApiResponse(response);
        } catch (error) {
            console.error('Failed to load categories:', error);
            toast.error(
                error.details || 'カテゴリーの読み込みに失敗しました。ページを再読み込みしてください。',
                'カテゴリー読み込みエラー'
            );
        }
    }

    async loadLessons(category = null) {
        try {
            const url = category
                ? `${API_BASE}/api/lessons?category=${category}`
                : `${API_BASE}/api/lessons`;
            const response = await fetch(url);
            this.lessons = await handleApiResponse(response);
        } catch (error) {
            console.error('Failed to load lessons:', error);
            toast.error(
                error.details || 'レッスンの読み込みに失敗しました。',
                'レッスン読み込みエラー'
            );
        }
    }

    async loadLesson(lessonId) {
        try {
            const response = await fetch(`${API_BASE}/api/lessons/${lessonId}`);
            this.currentLesson = await handleApiResponse(response);
            this.renderLessonDetail();
        } catch (error) {
            console.error('Failed to load lesson:', error);
            toast.error(
                error.details || 'レッスンの読み込みに失敗しました。',
                error.message || 'レッスン読み込みエラー'
            );
            this.showLessonsList();
        }
    }

    async loadProgress() {
        try {
            const response = await fetch(`${API_BASE}/api/progress/${USER_ID}`);
            const data = await handleApiResponse(response);
            this.completedLessons = data.completedLessons || [];
        } catch (error) {
            console.error('Failed to load progress:', error);
            // Progress loading error is not critical, don't show toast
        }
    }

    async saveProgress(lessonId) {
        try {
            const response = await fetch(`${API_BASE}/api/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: USER_ID,
                    lessonId: lessonId
                })
            });
            const data = await handleApiResponse(response);
            if (!this.completedLessons.includes(lessonId)) {
                this.completedLessons.push(lessonId);
            }
            this.updateProgress();
            toast.success('レッスンを完了しました！', '進捗更新');
            return data;
        } catch (error) {
            console.error('Failed to save progress:', error);
            toast.error(
                error.details || '進捗の保存に失敗しました。',
                '進捗保存エラー'
            );
        }
    }

    renderCategories() {
        const container = document.getElementById('categories-list');

        const allButton = document.createElement('div');
        allButton.className = 'category-item active';
        allButton.innerHTML = '<span class="category-icon">📚</span><span>すべて</span>';
        allButton.onclick = () => this.selectCategory(null);
        container.appendChild(allButton);

        this.categories.forEach(category => {
            const item = document.createElement('div');
            item.className = 'category-item';
            item.innerHTML = `<span class="category-icon">${category.icon}</span><span>${category.name}</span>`;
            item.onclick = () => this.selectCategory(category.id);
            container.appendChild(item);
        });
    }

    async selectCategory(categoryId) {
        this.currentCategory = categoryId;

        const items = document.querySelectorAll('.category-item');
        items.forEach((item, index) => {
            if ((index === 0 && categoryId === null) ||
                (categoryId && item.textContent.includes(this.categories.find(c => c.id === categoryId)?.name))) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        await this.loadLessons(categoryId);
        this.showLessonsList();
    }

    showLessonsList() {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('lesson-detail').style.display = 'none';
        document.getElementById('lessons-list').style.display = 'block';

        const categoryName = this.currentCategory
            ? this.categories.find(c => c.id === this.currentCategory)?.name
            : 'すべてのレッスン';

        document.getElementById('category-title').textContent = categoryName;
        this.renderLessonsList();
    }

    renderLessonsList() {
        const container = document.getElementById('lessons-grid');
        container.innerHTML = '';

        this.lessons.forEach(lesson => {
            const card = document.createElement('div');
            card.className = 'lesson-card';

            if (this.completedLessons.includes(lesson.id)) {
                card.classList.add('completed');
            }

            card.innerHTML = `
                <h3>${lesson.title}</h3>
                <p>${lesson.description}</p>
            `;
            card.onclick = () => this.loadLesson(lesson.id);
            container.appendChild(card);
        });
    }

    renderLessonDetail() {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('lessons-list').style.display = 'none';
        document.getElementById('lesson-detail').style.display = 'block';

        const container = document.getElementById('lesson-content');
        const lesson = this.currentLesson;

        let html = `
            <div class="lesson-header">
                <h2>${lesson.title}</h2>
                <p>${lesson.description}</p>
            </div>
        `;

        lesson.content.forEach(item => {
            html += `<div class="lesson-content-item ${item.type}">`;

            if (item.type === 'image' && item.imageUrl) {
                html += `<img src="${item.imageUrl}" alt="Lesson image" style="max-width: 100%; border-radius: 6px;">`;
            }

            html += item.content;
            html += `</div>`;
        });

        const isCompleted = this.completedLessons.includes(lesson.id);

        html += `
            <div class="lesson-actions">
                ${lesson.quiz ? `<button class="btn-primary" onclick="app.showQuizModal()">理解度チェック</button>` : ''}
                ${!isCompleted ? `<button class="btn-secondary" onclick="app.markAsComplete()">完了にする</button>` : ''}
                ${isCompleted ? `<span style="color: var(--success-color); font-weight: bold;">✓ 完了済み</span>` : ''}
            </div>
        `;

        container.innerHTML = html;
    }

    showQuizModal() {
        const modal = document.getElementById('quiz-modal');
        const content = document.getElementById('quiz-content');
        const quiz = this.currentLesson.quiz;

        let html = `
            <div class="quiz-question">${quiz.question}</div>
            <div class="quiz-options">
        `;

        quiz.options.forEach((option, index) => {
            html += `
                <div class="quiz-option" data-index="${index}" onclick="app.selectQuizOption(${index})">
                    ${option}
                </div>
            `;
        });

        html += `</div>`;
        content.innerHTML = html;

        document.getElementById('quiz-result').style.display = 'none';
        document.getElementById('submit-quiz-btn').style.display = 'inline-block';
        document.getElementById('next-lesson-btn').style.display = 'none';

        modal.classList.add('active');
        this.selectedQuizAnswer = null;
    }

    selectQuizOption(index) {
        this.selectedQuizAnswer = index;

        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, i) => {
            if (i === index) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }

    async submitQuiz() {
        if (this.selectedQuizAnswer === null) {
            toast.warning('回答を選択してください', 'クイズ回答');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/lessons/${this.currentLesson.id}/quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answer: this.selectedQuizAnswer
                })
            });

            const result = await handleApiResponse(response);
            this.showQuizResult(result);

            if (result.correct && !this.completedLessons.includes(this.currentLesson.id)) {
                await this.saveProgress(this.currentLesson.id);
            }
        } catch (error) {
            console.error('Failed to submit quiz:', error);
            toast.error(
                error.details || 'クイズの送信に失敗しました。もう一度お試しください。',
                error.message || 'クイズ送信エラー'
            );
        }
    }

    showQuizResult(result) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.onclick = null;
            if (index === result.correctAnswer) {
                option.classList.add('correct');
            } else if (index === this.selectedQuizAnswer && !result.correct) {
                option.classList.add('incorrect');
            }
        });

        const resultDiv = document.getElementById('quiz-result');
        resultDiv.className = 'quiz-result ' + (result.correct ? 'correct' : 'incorrect');
        resultDiv.innerHTML = `
            <strong>${result.correct ? '✓ 正解です！' : '✗ 不正解です'}</strong>
            <div class="quiz-explanation">${result.explanation}</div>
        `;
        resultDiv.style.display = 'block';

        document.getElementById('submit-quiz-btn').style.display = 'none';
        document.getElementById('next-lesson-btn').style.display = 'inline-block';
    }

    closeQuizModal() {
        document.getElementById('quiz-modal').classList.remove('active');
    }

    async markAsComplete() {
        await this.saveProgress(this.currentLesson.id);
        this.renderLessonDetail();
    }

    updateProgress() {
        const total = this.categories.length > 0 ?
            (async () => {
                if (this.lessons.length === 0) {
                    await this.loadLessons();
                }
                return this.lessons.length;
            })() : 0;

        Promise.resolve(total).then(totalLessons => {
            const completed = this.completedLessons.length;
            const percentage = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

            document.getElementById('progress-fill').style.width = `${percentage}%`;
            document.getElementById('progress-percentage').textContent = `${percentage}%`;
        });
    }

    goToNextLesson() {
        this.closeQuizModal();

        const currentIndex = this.lessons.findIndex(l => l.id === this.currentLesson.id);
        if (currentIndex < this.lessons.length - 1) {
            this.loadLesson(this.lessons[currentIndex + 1].id);
        } else {
            this.showLessonsList();
        }
    }
}

const app = new SlackLearningApp();

document.getElementById('submit-quiz-btn').addEventListener('click', () => app.submitQuiz());
document.getElementById('next-lesson-btn').addEventListener('click', () => app.goToNextLesson());
