import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { DUR, EASE, SPRING } from '../../lib/motion';
import { useDialog } from '../../hooks/useDialog';
import { useLang } from '../../hooks/useLang';
import { ChevronLeft, ChevronRight, Close } from '../ui/Icons';

function GalleryDialog({ frames, title, initialIndex, onClose }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(initialIndex);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const dialogRef = useDialog(onClose);
  const total = frames.length;

  const activeFrame = frames[index];

  useEffect(() => {
    setImageLoaded(false);
    setImageFailed(false);
  }, [activeFrame]);

  const go = useCallback((step) => {
    setIndex((current) => (current + step + total) % total);
  }, [total]);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft' && total > 1) {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight' && total > 1) {
      event.preventDefault();
      go(1);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6">
      <motion.button
        type="button"
        aria-label={t('Close gallery', 'إغلاق معرض الصور')}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.sm }}
        className="absolute inset-0 cursor-default bg-base/90 backdrop-blur-md"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t(`${title} image gallery`, `معرض صور ${title}`)}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={reduced ? { duration: DUR.sm } : SPRING.sheet}
        className="relative flex max-h-[94dvh] w-full max-w-7xl flex-col border border-line bg-base shadow-2xl shadow-black/30 outline-none"
      >
        <div className="flex min-h-12 items-center justify-between border-b border-line px-4 sm:px-5">
          <span className="label tabular-nums">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Close gallery', 'إغلاق معرض الصور')}
            className="-me-2 flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-ink"
          >
            <Close className="h-4 w-4" />
          </button>
        </div>

        <div className="relative flex min-h-[18rem] flex-1 items-center justify-center bg-graphite-950 p-2 sm:min-h-[24rem] sm:p-4">
          {!imageLoaded && !imageFailed && (
            <span aria-hidden="true" className="absolute inset-4 animate-pulse bg-graphite-900 motion-reduce:animate-none" />
          )}
          <motion.img
            key={activeFrame}
            src={activeFrame}
            alt={`${title} — screen ${index + 1} of ${total}`}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: DUR.sm, ease: EASE.out }}
            draggable={false}
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            className="max-h-[78dvh] max-w-full object-contain"
          />

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t('Previous screenshot', 'الصورة السابقة')}
                className="absolute start-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 sm:start-5"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t('Next screenshot', 'الصورة التالية')}
                className="absolute end-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 sm:end-5"
              >
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

export default function WebProjectGallery({ frames, title, onOpenChange }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);

  const coverFrame = frames[0];

  useEffect(() => {
    setCoverLoaded(false);
    setCoverFailed(false);
  }, [coverFrame]);

  if (!frames.length) return null;

  const openGallery = () => {
    setOpen(true);
    onOpenChange?.(true);
  };

  const closeGallery = () => {
    setOpen(false);
    onOpenChange?.(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openGallery}
        aria-label={t(`Open ${title} image gallery`, `افتح معرض صور ${title}`)}
        className="group/media relative block aspect-[16/10] w-full overflow-hidden border border-line-strong bg-graphite-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      >
        {!coverLoaded && !coverFailed && (
          <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-graphite-900 motion-reduce:animate-none" />
        )}
        <img
          src={coverFrame}
          alt={`${title} — screen 1 of ${frames.length}`}
          loading="lazy"
          decoding="async"
          draggable={false}
          onLoad={() => setCoverLoaded(true)}
          onError={() => setCoverFailed(true)}
          className={`h-full w-full object-contain transition-[opacity,transform] duration-500 ease-out motion-safe:group-hover/media:scale-[1.01] ${
            coverLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <span className="absolute bottom-3 end-3 bg-black/55 px-2 py-1 font-mono text-[10px] text-white backdrop-blur-sm">
          {t(frames.length > 1 ? `View gallery · ${frames.length}` : 'View image', frames.length > 1 ? `عرض الصور · ${frames.length}` : 'عرض الصورة')}
        </span>
      </button>

      {open && (
        <GalleryDialog
          frames={frames}
          title={title}
          initialIndex={0}
          onClose={closeGallery}
        />
      )}
    </>
  );
}
