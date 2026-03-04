import { useEffect, useState } from "react";
import bgScene from "./assets/bg-scene.svg";
import dealershipMorning from "./assets/1585754148491-81a77129-2974-4550-9b50-2fd379d5eb22.jpg";
import mountainBend from "./assets/1585754350357-4a9d436d-f776-4a28-8353-7f5f59c30bf9.jpg";
import scenicTurnout from "./assets/1586019823682-6abaad6b-b2e9-469e-9fc7-1c1773389f6b.jpg";
import youngPops from "./assets/1586020088901-7aed7cbf-87c4-475b-aa4f-da8c5dfc101f.jpg";
import himachalColors from "./assets/_DSC1362.JPG";
import nightDriveStop from "./assets/IMG20200102183345.jpg";
import fortressViews from "./assets/IMG_20180107_121958.jpg";
import gardenChill from "./assets/converted/IMG_3897.jpg";
import mountainBalcony from "./assets/converted/IMG_4279.jpg";
import roadsMeetClouds from "./assets/converted/IMG_4420.jpg";
import popsTerritory from "./assets/converted/IMG_4426.jpg";
import altitudeAttitude from "./assets/converted/IMG_4453.jpg";

const photos = [
  {
    src: dealershipMorning,
    caption: "Two smiles, one classic photo.",
    tilt: -5,
    orientation: "landscape",
  },
  {
    src: mountainBend,
    caption: "The OG shoulder ride.",
    tilt: 4,
    orientation: "portrait",
  },
  {
    src: scenicTurnout,
    caption: "Chaos, cuddles, and Pops.",
    tilt: -3,
    orientation: "landscape",
  },
  {
    src: youngPops,
    caption: "Serving confidence since day one.",
    tilt: 3,
    orientation: "portrait",
  },
  {
    src: himachalColors,
    caption: "Matching fits, main characters.",
    tilt: -2,
    orientation: "landscape",
  },
  {
    src: nightDriveStop,
    caption: "Late-night mission vibes.",
    tilt: 2,
    orientation: "portrait",
  },
  {
    src: fortressViews,
    caption: "Sunlight + sunglasses energy.",
    tilt: -4,
    orientation: "landscape",
  },
  {
    src: gardenChill,
    caption: "Just vibing (professionally).",
    tilt: 5,
    orientation: "portrait",
  },
  {
    src: mountainBalcony,
    caption: "Views doing the most.",
    tilt: -1,
    orientation: "landscape",
  },
  {
    src: roadsMeetClouds,
    caption: "Cold air, warm chai energy.",
    tilt: 2,
    orientation: "landscape",
  },
  {
    src: popsTerritory,
    caption: "Car + mountains = Pops happy.",
    tilt: -3,
    orientation: "portrait",
  },
  {
    src: altitudeAttitude,
    caption: "High altitude, higher vibes.",
    tilt: 4,
    orientation: "landscape",
  },
];

function Cloud({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 260 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M46 100C21 100 5 84 5 61C5 39 22 23 45 23C53 23 61 25 69 29C79 12 98 0 120 0C151 0 177 22 181 52C182 52 183 52 184 52C217 52 244 71 244 95C244 109 233 120 203 120H46V100Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ScenicBackdrop() {
  return (
    <div className="scenery" aria-hidden="true">
      <img className="scenery__scene" src={bgScene} alt="" />
      <Cloud className="scenery__cloud scenery__cloud--one" />
      <Cloud className="scenery__cloud scenery__cloud--two" />
      <Cloud className="scenery__cloud scenery__cloud--three" />
    </div>
  );
}

function Bike({ className }) {
  return (
    <svg className={className} viewBox="0 0 88 44" aria-hidden="true">
      <g className="hero__bike-outline">
        <circle cx="22" cy="30" r="10" />
        <circle cx="64" cy="30" r="10" />
        <path d="M30 28 L40 14 L54 28 L43 28 Z" />
        <path d="M40 14 H54 L62 22" />
        <path d="M42 14 L35 10" />
        <path d="M52 13 H66" />
        <path d="M18 18 H30" />
      </g>
      <g className="hero__bike-body">
        <circle cx="22" cy="30" r="10" />
        <circle cx="64" cy="30" r="10" />
        <path d="M30 28 L40 14 L54 28 L43 28 Z" />
        <path d="M40 14 H54 L62 22" />
        <path d="M42 14 L35 10" />
        <path d="M52 13 H66" />
        <path d="M18 18 H30" />
      </g>
    </svg>
  );
}

function PhotoCard({ photo, index, onOpen }) {
  return (
    <button
      type="button"
      className={`photo-card photo-card--${photo.orientation}`}
      style={{ "--card-tilt": `${photo.tilt}deg` }}
      onClick={() => onOpen(index)}
      aria-label={`Open photo ${index + 1}: ${photo.caption}`}
    >
      <span className="photo-card__pin" aria-hidden="true" />
      <span className="photo-card__window">
        <span
          className="photo-card__backdrop"
          aria-hidden="true"
          style={{ backgroundImage: `url(${photo.src})` }}
        />
        <span className="photo-card__wash" aria-hidden="true" />
        <img
          className="photo-card__image"
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="photo-card__caption">{photo.caption}</span>
    </button>
  );
}

function Lightbox({ activeIndex, photo, totalPhotos, onClose, onPrevious, onNext }) {
  if (!photo) {
    return null;
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
      onClick={onClose}
    >
      <div
        className="lightbox__panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="lightbox__header">
          <p className="lightbox__count">
            Photo {activeIndex + 1} of {totalPhotos}
          </p>
          <button
            type="button"
            className="lightbox__close"
            onClick={onClose}
            aria-label="Close lightbox"
          >
            Close
          </button>
        </div>

        <figure className="lightbox__figure">
          <img className="lightbox__image" src={photo.src} alt={photo.caption} />
          <figcaption id="lightbox-caption" className="lightbox__caption">
            {photo.caption}
          </figcaption>
        </figure>

        <div className="lightbox__actions">
          <button
            type="button"
            className="lightbox__nav"
            onClick={onPrevious}
            aria-label="Show previous photo"
          >
            ← Prev
          </button>
          <button
            type="button"
            className="lightbox__nav"
            onClick={onNext}
            aria-label="Show next photo"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  const closeLightbox = () => setActiveIndex(null);

  const showPrevious = () => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex - 1 + photos.length) % photos.length;
    });
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + 1) % photos.length;
    });
  };

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <div className="app-shell">
      <ScenicBackdrop />

      <div className="page-shell">
        <header className="hero">
          <p className="hero__eyebrow">
            For the dad who turned every drive into a story
          </p>
          <h1>Happy Birthday, Pops 🎂</h1>
          <p className="hero__subtitle">
            From Yamaha mornings to Himachal sunsets, here&apos;s to every
            ride, every road, and every story you&apos;ve given us.
          </p>
          <p className="hero__hint">Tap a photo to zoom.</p>

          <div className="hero__ride-lane" aria-hidden="true">
            <span className="hero__bike-runner">
              <Bike className="hero__bike" />
            </span>
          </div>
        </header>

        <main className="content">
          <section className="photo-wall" aria-label="Birthday photo wall">
            {photos.map((photo, index) => (
              <PhotoCard
                key={photo.caption}
                photo={photo}
                index={index}
                onOpen={setActiveIndex}
              />
            ))}
          </section>
        </main>
      </div>

      <Lightbox
        activeIndex={activeIndex}
        photo={activePhoto}
        totalPhotos={photos.length}
        onClose={closeLightbox}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </div>
  );
}

export default App;
