import {staticFile} from 'remotion';
import {lessonPlan as consistencyLessonPlan} from './consistency-in-practice/lessonPlan';
import consistencyWords from './consistency-in-practice/words.json';
import {lessonPlan as availabilityLessonPlan} from './availability-patterns-1-what-is-availability-why-some-systems-never-sleep/lessonPlan';
import availabilityWords from './availability-patterns-1-what-is-availability-why-some-systems-never-sleep/words.json';
import type {VideoDefinition, WordTiming} from '../types';

export const videos: VideoDefinition[] = [
  {
    id: 'ConsistencyInPractice',
    slug: 'consistency-in-practice',
    title: 'Consistency in Practice',
    subtitle: 'Engineering systems that mix strong and eventual guarantees',
    audioSrc: staticFile('audio/consistency-in-practice.mp3'),
    words: consistencyWords as WordTiming[],
    lessonPlan: consistencyLessonPlan,
  },
  {
    id: 'AvailabilityPatternsWhatIsAvailability',
    slug: 'availability-patterns-1-what-is-availability-why-some-systems-never-sleep',
    title: 'Availability Patterns #1: What is Availability?',
    subtitle: 'Why some systems never sleep',
    audioSrc: staticFile('audio/availability-patterns-what-is-availability.mp3'),
    words: availabilityWords as WordTiming[],
    lessonPlan: availabilityLessonPlan,
  },
];

export const defaultVideo = videos[0];
