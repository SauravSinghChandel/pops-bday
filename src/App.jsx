import { useEffect, useState } from "react";
import pops1 from "./assets/pops1.svg";
import pops2 from "./assets/pops2.svg";
import pops3 from "./assets/pops3.svg";
import pops4 from "./assets/pops4.svg";
import pops5 from "./assets/pops5.svg";
import pops6 from "./assets/pops6.svg";
import pops7 from "./assets/pops7.svg";
import pops8 from "./assets/pops8.svg";

const photos = [
  { src: pops1, caption: "Backyard legend", angle: -4 },
  { src: pops2, caption: "Sunday drive energy", angle: 3 },
  { src: pops3, caption: "Always first at the grill", angle: -2 },
  { src: pops4, caption: "Storytime champion", angle: 4 },
  { src: pops5, caption: "Vacation mode: activated", angle: -3 },
  { src: pops6, caption: "Classic Pops smile", angle: 2 },
  { src: pops7, caption: "Keeping the crew laughing", angle: -5 },
  { src: pops8, caption: "Birthday wall favorite", angle: 3 },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((currentIndex) => (currentIndex + 1) % photos.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex(
          (currentIndex) => (currentIndex - 1 + photos.length) % photos.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const closeLightbox = () => setActiveIndex(null);
  const showPrevious = () =>
    setActiveIndex(
      (currentIndex) => (currentIndex - 1 + photos.length) % photos.length,
    );
  const showNext = () =>
    setActiveIndex((currentIndex) => (currentIndex + 1) % photos.length);

  return (
    <div className="page-shell">
      <header className="hero">
        <p className="hero__eyebrow">A wall full of good memories</p>
        <h1>Happy Birthday, Pops 🎂</h1>
        <p className="hero__subtitle">
          A little gallery of snapshots, laughs, and the kind of moments that
          always feel worth pinning up.
        </p>
      </header>

      <main>
        <section className="photo-wall" aria-label="Birthday photo wall">
          {photos.map((photo, index) => (
            <button
              key={photo.caption}
              type="button"
              className="photo-card"
              style={{ "--tile-rotation": `${photo.angle}deg` }}
              onClick={() => setActiveIndex(index)}
            >
              <span className="photo-card__pin" aria-hidden="true" />
              <img
                className="photo-card__image"
                src={photo.src}
                alt={photo.caption}
              />
              <span className="photo-card__caption">{photo.caption}</span>
            </button>
          ))}
        </section>
      </main>

      {activePhoto ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-caption"
          onClick={closeLightbox}
        >
          <div className="lightbox__panel" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox__header">
              <p className="lightbox__count">
                Photo {activeIndex + 1} of {photos.length}
              </p>
              <button
                type="button"
                className="lightbox__close"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                Close
              </button>
            </div>

            <figure className="lightbox__figure">
              <img
                className="lightbox__image"
                src={activePhoto.src}
                alt={activePhoto.caption}
              />
              <figcaption id="lightbox-caption" className="lightbox__caption">
                {activePhoto.caption}
              </figcaption>
            </figure>

            <div className="lightbox__actions">
              <button
                type="button"
                className="lightbox__nav"
                onClick={showPrevious}
                aria-label="Show previous photo"
              >
                ← Prev
              </button>
              <button
                type="button"
                className="lightbox__nav"
                onClick={showNext}
                aria-label="Show next photo"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
