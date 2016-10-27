export const MediumExtractor = {
  domain: 'medium.com',
  title: {
    selectors: [
      'h1',
    ],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '.section-content',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      // Re-write lazy-loaded youtube videos
      iframe: ($node) => {
        const ytRe =
          /https:\/\/i.embed.ly\/.+url=https:\/\/i\.ytimg\.com\/vi\/(\w+)\//;
        const thumb = decodeURIComponent($node.attr('data-thumbnail'));

        if (ytRe.test(thumb)) {
          const [_, youtubeId] = thumb.match(ytRe) // eslint-disable-line
          $node.attr('src', `https://www.youtube.com/embed/${youtubeId}`);
          const $parent = $node.parents('figure');
          $parent.prepend($node.clone());
          $node.remove();
        }
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ],
  },

  date_published: {
    selectors: [
      ['time[datetime]', 'datetime'],
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  next_page_url: {
    selectors: [
      // enter selectors
    ],
  },

  excerpt: {
    selectors: [
      // enter selectors
    ],
  },
};
