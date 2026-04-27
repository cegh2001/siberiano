import HeroSection from './components/HeroSection';
import ProjectCard from './components/ProjectCard';

const projects = [
  {
    id: 'project-1',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
    imageAlt: 'Homeland Poem',
    artist: 'HUSKY',
    title: "'HOMELAND POEM'",
  },
  {
    id: 'project-2',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
    imageAlt: 'The Untitled',
    artist: 'MASLO CHERNOGO TMINA',
    title: "'THE UNTITLED'",
  },
  {
    id: 'project-3',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    imageAlt: 'Endless Magazine',
    artist: 'HUSKY',
    title: "'ENDLESS MAGAZINE'",
  },
  {
    id: 'project-4',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80',
    imageAlt: 'Million Dollar Depression',
    artist: 'PHARAOH',
    title: "'MILLION DOLLAR DEPRESSION'",
  },
  {
    id: 'project-5',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    imageAlt: 'Never-Ever',
    artist: 'HUSKY',
    title: "'NEVER-EVER'",
  },
  {
    id: 'project-6',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    imageAlt: 'TV Promo',
    artist: 'TALK',
    title: "'TV PROMO'",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <section className="projects" id="projects">
        <div className="projects-grid" id="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
