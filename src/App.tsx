import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Coffee,
  Droplets,
  Github,
  Layers3,
  Menu,
  MousePointer2,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  glossary,
  lessons,
  sources,
  type Lesson,
  type LessonId,
} from "./course";
import { GroupLab, MachineLab } from "./MachineLab";
import { CareLab, CircuitLab, HeatLab, PressureLab, SteamLab } from "./Labs";
import { MarzoccoLab } from "./MarzoccoLab";

const storagePrefix = "espresso-atelier:v1:complete:";

function readProgress(): { completed: LessonId[]; persistent: boolean } {
  try {
    return {
      completed: lessons
        .filter(
          (lesson) => localStorage.getItem(storagePrefix + lesson.id) === "1",
        )
        .map((lesson) => lesson.id),
      persistent: true,
    };
  } catch {
    return { completed: [], persistent: false };
  }
}

function lessonFromHash() {
  return (
    lessons.find((lesson) => `#${lesson.id}` === window.location.hash) ??
    lessons[0]
  );
}

function Quiz({
  lesson,
  complete,
  onComplete,
}: {
  lesson: Lesson;
  complete: boolean;
  onComplete: () => void;
}) {
  const [answer, setAnswer] = useState<number | null>(null);
  const chosen = answer === null ? null : lesson.answers[answer];
  return (
    <section className="quiz" aria-labelledby="quiz-heading">
      <div className="quiz-label">
        <CircleHelp size={18} />
        <span className="eyebrow">A QUICK CHECK</span>
        {complete && (
          <span className="quiz-complete">
            <Check size={13} /> Lesson completed
          </span>
        )}
      </div>
      <h2 id="quiz-heading">{lesson.question}</h2>
      <div className="quiz-answers">
        {lesson.answers.map((item, index) => (
          <button
            key={item.text}
            onClick={() => {
              setAnswer(index);
              if (item.correct) onComplete();
            }}
            aria-pressed={answer === index}
            className={
              answer === index ? (item.correct ? "correct" : "incorrect") : ""
            }
          >
            <span>{String.fromCharCode(65 + index)}</span>
            {item.text}
            {answer === index &&
              (item.correct ? <Check size={17} /> : <X size={17} />)}
          </button>
        ))}
      </div>
      {chosen && (
        <p
          className={`quiz-feedback ${chosen.correct ? "correct" : "incorrect"}`}
          role="status"
        >
          {chosen.feedback}
          {!chosen.correct && " Try another answer."}
        </p>
      )}
      <p className="fine-print">
        Answer correctly to save this lesson as complete. You can explore every
        lesson in any order.
      </p>
    </section>
  );
}

function LessonLab({ lesson }: { lesson: Lesson }) {
  const [view, setView] = useState<"machine" | "water" | "group">("machine");
  switch (lesson.id) {
    case "anatomy":
      return (
        <>
          <div className="workbench-tabs" aria-label="Anatomy views">
            <button
              className={view === "machine" ? "active" : ""}
              aria-pressed={view === "machine"}
              onClick={() => setView("machine")}
            >
              <Layers3 size={15} />
              Exploded view
            </button>
            <button
              className={view === "water" ? "active" : ""}
              aria-pressed={view === "water"}
              onClick={() => setView("water")}
            >
              <Droplets size={15} />
              Water circuit
            </button>
            <button
              className={view === "group" ? "active" : ""}
              aria-pressed={view === "group"}
              onClick={() => setView("group")}
            >
              <Coffee size={15} />
              Group assembly
            </button>
            <span className="workbench-hint">AN INTERACTIVE EXPLORATION</span>
          </div>
          {view === "machine" ? (
            <MachineLab onFollowWater={() => setView("water")} />
          ) : view === "water" ? (
            <CircuitLab />
          ) : (
            <GroupLab />
          )}
        </>
      );
    case "water":
      return <CircuitLab />;
    case "heat":
      return <HeatLab />;
    case "pressure":
      return <PressureLab />;
    case "group":
      return <GroupLab />;
    case "steam":
      return <SteamLab />;
    case "marzocco":
      return <MarzoccoLab />;
    case "care":
      return <CareLab />;
  }
}

export default function App() {
  const [lesson, setLesson] = useState(lessonFromHash);
  const [progress, setProgress] = useState(readProgress);
  const [library, setLibrary] = useState<"glossary" | "sources">("glossary");
  const [search, setSearch] = useState("");
  const referenceDialog = useRef<HTMLDialogElement>(null);
  const navigationDialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const lessonIndex = lessons.indexOf(lesson);
  const completionPercent = Math.round(
    (progress.completed.length / lessons.length) * 100,
  );
  const nextLesson = lessons[lessonIndex + 1];
  const previousLesson = lessons[lessonIndex - 1];

  useEffect(() => {
    function navigate() {
      setLesson(lessonFromHash());
      navigationDialog.current?.close();
      window.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() =>
        heading.current?.focus({ preventScroll: true }),
      );
    }
    function syncProgress() {
      const saved = readProgress();
      setProgress((previous) => ({
        completed: [...new Set([...previous.completed, ...saved.completed])],
        persistent: saved.persistent,
      }));
    }
    window.addEventListener("hashchange", navigate);
    window.addEventListener("storage", syncProgress);
    return () => {
      window.removeEventListener("hashchange", navigate);
      window.removeEventListener("storage", syncProgress);
    };
  }, []);

  useEffect(() => {
    document.title = `${lesson.nav} · Espresso Atelier`;
  }, [lesson.nav]);

  function completeLesson() {
    let persistent = true;
    try {
      localStorage.setItem(storagePrefix + lesson.id, "1");
    } catch {
      persistent = false;
    }
    setProgress((previous) => ({
      completed: [...new Set([...previous.completed, lesson.id])],
      persistent,
    }));
  }

  function openLibrary(tab: "glossary" | "sources") {
    setLibrary(tab);
    setSearch("");
    referenceDialog.current?.showModal();
  }

  const courseNavigation = (
    <nav aria-label="Course lessons">
      {lessons.map((item, index) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => navigationDialog.current?.close()}
          className={`lesson-link ${lesson.id === item.id ? "active" : ""}`}
          aria-current={lesson.id === item.id ? "step" : undefined}
        >
          <span
            className={`lesson-number ${progress.completed.includes(item.id) ? "done" : ""}`}
          >
            {progress.completed.includes(item.id) ? (
              <Check size={12} />
            ) : (
              String(index + 1).padStart(2, "0")
            )}
          </span>
          <span>{item.nav}</span>
          {lesson.id === item.id && <span className="nav-active-dot" />}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          heading.current?.focus();
          document.getElementById("main-content")?.scrollIntoView();
        }}
      >
        Skip to lesson
      </a>
      <aside className="sidebar">
        <a className="brand" href="#anatomy" aria-label="Espresso Atelier home">
          <div className="brand-mark">
            <Coffee size={25} strokeWidth={1.3} />
          </div>
          <span>
            espresso
            <span className="brand-second">
              atelier<span className="brand-star">✳</span>
            </span>
          </span>
        </a>
        <p className="brand-caption">THE MACHINE, EXPLAINED.</p>
        <div className="sidebar-divider" />
        <div className="course-label">
          <BookOpen size={15} />
          <span>THE WALKTHROUGH</span>
          <span className="lesson-count">08</span>
        </div>
        {courseNavigation}
        <div className="sidebar-resources">
          <button onClick={() => openLibrary("glossary")}>
            <BookOpen size={16} />
            The glossary
            <ArrowUpRight size={14} />
          </button>
          <button onClick={() => openLibrary("sources")}>
            <ShieldCheck size={16} />
            Sources & reading
            <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-progress">
            <span>Your progress</span>
            <strong>{completionPercent}%</strong>
          </div>
          <div className="progress-track">
            <div style={{ width: `${completionPercent}%` }} />
          </div>
          <p>
            {progress.completed.length} of {lessons.length} lessons complete
          </p>
          <div className="sidebar-footer">
            <span>MADE FOR THE CURIOUS.</span>
            <Coffee size={14} />
          </div>
        </div>
      </aside>
      <div className="page-shell">
        <header className="topbar">
          <button
            className="mobile-menu icon-button"
            aria-label="Open course menu"
            onClick={() => navigationDialog.current?.showModal()}
          >
            <Menu size={21} />
          </button>
          <div className="breadcrumb">
            <span>The field guide</span>
            <ChevronRight size={13} />
            <span>{lesson.nav}</span>
          </div>
          <div className="topbar-actions">
            <span className="edition-label">VOL. 01 / ESPRESSO MACHINES</span>
            <button
              onClick={() => openLibrary("glossary")}
              className="icon-button"
              aria-label="Search the glossary"
            >
              <Search size={18} />
            </button>
            <a
              href="https://github.com/refcell/espresso"
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label="View the source on GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </header>
        <main id="main-content">
          <div className="lesson-heading">
            <div>
              <div className="lesson-eyebrow">
                <span className="chapter-number">
                  {String(lessonIndex + 1).padStart(2, "0")}
                </span>
                <span>THE WALKTHROUGH</span>
                <span className="eyebrow-separator">/</span>
                <span>
                  LESSON {lessonIndex + 1} OF {lessons.length}
                </span>
              </div>
              <h1 ref={heading} tabIndex={-1}>
                {lesson.title} <em>{lesson.accent}</em>
              </h1>
              <p className="lesson-subtitle">{lesson.subtitle}</p>
            </div>
            <div className="lesson-meta">
              <span>
                <Clock3 size={14} /> {lesson.minutes} MIN READ
              </span>
              <span>
                <MousePointer2 size={14} /> HANDS-ON LEARNING
              </span>
            </div>
          </div>
          <LessonLab key={`lab-${lesson.id}`} lesson={lesson} />
          <div className="try-it">
            <span className="try-it-icon">
              <MousePointer2 size={19} />
            </span>
            <div>
              <strong>Your turn</strong>
              <p>{lesson.objective}</p>
            </div>
            <span className="try-it-tag">LEARN BY DOING</span>
          </div>
          <section
            className="lesson-reading"
            aria-labelledby="lesson-reading-heading"
          >
            <div className="section-heading">
              <span className="eyebrow">THE IDEAS BEHIND THE ENGINEERING</span>
              <h2 id="lesson-reading-heading">Make sense of what you see.</h2>
            </div>
            <div className="reading-grid">
              {lesson.sections.map((section, index) => (
                <article key={section.title}>
                  <span className="reading-number">0{index + 1}</span>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </article>
              ))}
            </div>
          </section>
          <aside className="field-note">
            <div>
              <ShieldCheck size={20} />
              <span className="eyebrow">FIELD NOTE</span>
            </div>
            <h3>{lesson.note.title}</h3>
            <p>{lesson.note.text}</p>
          </aside>
          <Quiz
            key={`quiz-${lesson.id}`}
            lesson={lesson}
            complete={progress.completed.includes(lesson.id)}
            onComplete={completeLesson}
          />
          {!progress.persistent && (
            <p className="storage-notice" role="status">
              Browser storage is unavailable. Progress is saved only for this
              visit.
            </p>
          )}
          {progress.completed.length === lessons.length && (
            <section className="course-finished">
              <Sparkles size={24} />
              <span className="eyebrow">EIGHT LESSONS. A NEW PERSPECTIVE.</span>
              <h2>You’ve seen beneath the surface.</h2>
              <p>
                You can trace the water, separate heat from pressure, and
                explain what makes these machines different. Keep exploring any
                lesson, or use the reference library for a refresher.
              </p>
              <button
                className="primary-button"
                onClick={() => openLibrary("sources")}
              >
                Keep reading
                <ArrowUpRight size={16} />
              </button>
            </section>
          )}
          <div className="lesson-sources">
            <span className="eyebrow">FURTHER READING</span>
            {sources
              .filter((source) => lesson.sources.includes(source.id))
              .map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source.title}
                  <ArrowUpRight size={12} />
                </a>
              ))}
          </div>
          <footer className="lesson-footer">
            {previousLesson ? (
              <a href={`#${previousLesson.id}`} className="previous-lesson">
                <ArrowLeft size={16} />
                <div>
                  <span>PREVIOUS LESSON</span>
                  {previousLesson.nav}
                </div>
              </a>
            ) : (
              <span className="first-lesson-note">
                Curiosity is the only prerequisite.
              </span>
            )}
            {nextLesson ? (
              <a href={`#${nextLesson.id}`} className="next-lesson">
                <div>
                  <span>
                    UP NEXT · {String(lessonIndex + 2).padStart(2, "0")}
                  </span>
                  {nextLesson.nav}
                </div>
                <ArrowRight size={18} />
              </a>
            ) : (
              <a href="#anatomy" className="next-lesson">
                <div>
                  <span>BACK TO THE BEGINNING</span>Explore the machine again
                </div>
                <ArrowRight size={18} />
              </a>
            )}
          </footer>
          <div className="page-colophon">
            <span>ESPRESSO ATELIER © {new Date().getFullYear()}</span>
            <span>
              An independent field guide. Not affiliated with La Marzocco.
            </span>
          </div>
        </main>
      </div>
      <dialog
        ref={navigationDialog}
        className="navigation-dialog"
        aria-label="Course navigation"
        onClick={(event) => {
          if (event.target === event.currentTarget)
            navigationDialog.current?.close();
        }}
      >
        <div className="dialog-heading">
          <span className="eyebrow">THE WALKTHROUGH</span>
          <button
            className="icon-button"
            aria-label="Close course menu"
            onClick={() => navigationDialog.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        {courseNavigation}
      </dialog>
      <dialog
        ref={referenceDialog}
        className="reference-dialog"
        aria-label="Reference library"
        onClick={(event) => {
          if (event.target === event.currentTarget)
            referenceDialog.current?.close();
        }}
      >
        <div className="dialog-heading">
          <div>
            <span className="eyebrow">KEEP YOUR CURIOSITY CLOSE</span>
            <h2>The reference library.</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close reference library"
            onClick={() => referenceDialog.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <div className="reference-tabs">
          <button
            className={library === "glossary" ? "active" : ""}
            aria-pressed={library === "glossary"}
            onClick={() => {
              setLibrary("glossary");
              setSearch("");
            }}
          >
            The glossary
          </button>
          <button
            className={library === "sources" ? "active" : ""}
            aria-pressed={library === "sources"}
            onClick={() => {
              setLibrary("sources");
              setSearch("");
            }}
          >
            Sources & reading
          </button>
        </div>
        <div className="library-search">
          <Search size={17} />
          <input
            aria-label="Search reference library"
            placeholder={
              library === "glossary"
                ? "Find a term, a component, an idea…"
                : "Find a model or source…"
            }
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div
          className="reference-results"
          tabIndex={0}
          role="region"
          aria-label="Reference results"
        >
          {library === "glossary" ? (
            <>
              {glossary
                .filter((item) =>
                  `${item.term} ${item.definition}`
                    .toLowerCase()
                    .includes(search.toLowerCase()),
                )
                .map((item) => (
                  <article key={item.term}>
                    <h3>{item.term}</h3>
                    <p>{item.definition}</p>
                  </article>
                ))}
              {!glossary.some((item) =>
                `${item.term} ${item.definition}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              ) && <p>No matching terms. Try “pressure,” “group,” or “PID.”</p>}
            </>
          ) : (
            <>
              <p className="reference-intro">
                Manufacturer documentation supports the model-specific teaching
                in this guide. Match your machine’s generation, configuration,
                and manual. Original diagrams are simplified and are not
                manufacturer service drawings.
              </p>
              {sources
                .filter((source) =>
                  `${source.title} ${source.publisher}`
                    .toLowerCase()
                    .includes(search.toLowerCase()),
                )
                .map((source) => (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>
                      <strong>{source.title}</strong>
                      <span>{source.publisher}</span>
                    </div>
                    <ArrowUpRight size={17} />
                  </a>
                ))}
              {!sources.some((source) =>
                `${source.title} ${source.publisher}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              ) && <p>No matching sources. Try a model name or “water.”</p>}
              <p className="fine-print">
                Model and documentation review: October 2026. This guide is
                independent of La Marzocco. It is not professional service
                advice.
              </p>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
