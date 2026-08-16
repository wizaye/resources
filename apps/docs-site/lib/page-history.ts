import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { resolve } from 'node:path';
import { cache } from 'react';
import { gitConfig } from '@/lib/shared';

export const getPageHistory = cache((pagePath: string) => {
  const repository = resolve(process.cwd(), '../..');
  const file = resolve(repository, 'content/docs', pagePath);
  const stat = statSync(file);

  try {
    const commits = execFileSync(
      'git',
      ['log', '--follow', '--format=%aI%x09%an%x09%ae', '--', file],
      { cwd: repository, encoding: 'utf8' },
    )
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [date, name, email] = line.split('\t');
        return { date: new Date(date), name, email };
      });
    if (commits.length === 0) throw new Error('No Git history');

    const contributors = new Map<string, { name: string; href: string }>();
    for (const { name, email } of commits) {
      const username = email.match(/(?:\d+\+)?([^@]+)@users\.noreply\.github\.com$/)?.[1];
      contributors.set(email, {
        name,
        href:
          username || name.toLowerCase() === gitConfig.user.toLowerCase()
            ? `https://github.com/${username ?? gitConfig.user}`
            : `https://github.com/${gitConfig.user}/${gitConfig.repo}/commits?author=${encodeURIComponent(email)}`,
      });
    }

    return {
      created: commits.at(-1)!.date,
      updated: commits[0].date,
      contributors: [...contributors.values()],
    };
  } catch {
    return {
      created: stat.birthtime,
      updated: stat.mtime,
      contributors: [{ name: gitConfig.user, href: `https://github.com/${gitConfig.user}` }],
    };
  }
});
