'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { projectsBase } from '@/resources/projects/projects-data';
import type { Project } from '@/resources/projects/projects-data';
import { mergeProjectsBase } from './merge-projects';
import type { AppLocale, Messages } from './types';
import pt from './messages/pt.json';
import en from './messages/en.json';
import es from './messages/es.json';
import zh from './messages/zh.json';

const STORAGE_KEY = 'horizonte-locale';

const MESSAGES: Record<AppLocale, Messages> = { pt, en, es, zh };

const HTML_LANG: Record<AppLocale, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
  zh: 'zh-CN',
};

function readLocale(): AppLocale {
  if (typeof window === 'undefined') return 'pt';
  const stored = window.localStorage.getItem(STORAGE_KEY) as AppLocale | null;
  if (stored && stored in MESSAGES) return stored;
  const short = navigator.language?.slice(0, 2).toLowerCase();
  if (short === 'en' || short === 'es' || short === 'zh') return short;
  if (short === 'pt') return 'pt';
  return 'pt';
}

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

type I18nContextValue = {
  locale: AppLocale;
  setLocale: (next: AppLocale) => void;
  messages: Messages;
  t: (key: string, vars?: Record<string, string>) => string;
  projects: Project[];
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<AppLocale>('pt');

  useEffect(() => {
    setLocaleState(readLocale());
  }, []);

  const messages = MESSAGES[locale];

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = HTML_LANG[next];
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
    document.title = messages.meta.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', messages.meta.description);
  }, [locale, messages]);

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => {
      const val = getByPath(messages, key);
      let out = typeof val === 'string' ? val : key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          out = out.replaceAll(`{{${k}}}`, v);
        }
      }
      return out;
    },
    [messages]
  );

  const projects = useMemo(
    () => mergeProjectsBase(projectsBase, messages.projects.cases),
    [messages]
  );

  const value = useMemo(
    () => ({ locale, setLocale, messages, t, projects }),
    [locale, setLocale, messages, t, projects]
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
};
