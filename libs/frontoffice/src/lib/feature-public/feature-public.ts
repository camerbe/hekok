import { Component } from '@angular/core';

@Component({
  selector: 'lib-feature-public',
  imports: [],
  template: `
    <main class="public-page">
      <section class="hero" aria-labelledby="public-title">
        <div class="hero__content">
          <p class="eyebrow">Hekok Media</p>
          <h1 id="public-title">Stories, videos, and community updates in one place.</h1>
          <p class="hero__summary">
            A cleaner public front office for publishing articles, showcasing videos,
            and keeping members connected with current messages.
          </p>
          <div class="hero__actions" aria-label="Primary actions">
            <a href="#latest" class="button button--primary">Explore updates</a>
            <a href="#community" class="button button--secondary">Meet the community</a>
          </div>
        </div>

        <aside class="hero__panel" aria-label="Publication snapshot">
          <div>
            <span class="metric">24</span>
            <span class="label">featured articles</span>
          </div>
          <div>
            <span class="metric">8</span>
            <span class="label">video stories</span>
          </div>
          <div>
            <span class="metric">3</span>
            <span class="label">member programs</span>
          </div>
        </aside>
      </section>

      <section id="latest" class="section">
        <div class="section__header">
          <p class="eyebrow">Latest focus</p>
          <h2>Designed for regular publishing</h2>
        </div>
        <div class="feature-grid">
          <article class="feature">
            <span class="feature__icon pi pi-book"></span>
            <h3>Articles</h3>
            <p>Highlight news, interviews, and long-form updates with clear reading paths.</p>
          </article>
          <article class="feature">
            <span class="feature__icon pi pi-video"></span>
            <h3>Videos</h3>
            <p>Give video content a dedicated surface that is easy to browse and promote.</p>
          </article>
          <article class="feature">
            <span class="feature__icon pi pi-comments"></span>
            <h3>Messages</h3>
            <p>Surface timely announcements without sending visitors into the admin area.</p>
          </article>
        </div>
      </section>

      <section id="community" class="community">
        <div>
          <p class="eyebrow">Community</p>
          <h2>Built to connect front office and back office.</h2>
        </div>
        <p>
          This public feature now provides a routed, branded shell that can be connected
          to the existing article, video, member, and message APIs as those views mature.
        </p>
      </section>
    </main>
  `,
  styleUrl: './feature-public.css',
})
export class FeaturePublic {}
