/*
  MEDIA QUERIES
  0 - 600px - Mobile devices (standard styles - you should write these styles first) NO MEDIA QUERY NEEDED
  600 - 900px - Tablet portrait
  900 - 1200px - Tablet landscape
  1200 - 1440px - Laptop
  1440 - 1800px - Desktop
  1800px + Large desktop
  Note: 1em = 16px;
*/

const size = {
  tabPort: '37.5rem', // 600px
  tabLand: '56.25rem', // 900px
  laptop: '75rem', // 1200px
  desktop: '90rem', // 1440px
  bigDesktop: '112.5rem', // 1800px
};

export default {
  tabPort: `(min-width: ${size.tabPort})`,
  tabLand: `(min-width: ${size.tabLand})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
  bigDesktop: `(min-width: ${size.bigDesktop})`,
};
