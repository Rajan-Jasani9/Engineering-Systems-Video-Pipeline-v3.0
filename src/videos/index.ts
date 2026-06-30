import {staticFile} from 'remotion';
import {lessonPlan as consistencyLessonPlan} from './consistency-in-practice/lessonPlan';
import consistencyWords from './consistency-in-practice/words.json';
import {lessonPlan as availabilityLessonPlan} from './availability-patterns-1-what-is-availability-why-some-systems-never-sleep/lessonPlan';
import availabilityWords from './availability-patterns-1-what-is-availability-why-some-systems-never-sleep/words.json';
import {lessonPlan as spofLessonPlan} from './single-point-of-failure/lessonPlan';
import spofWords from './single-point-of-failure/words.json';
import {lessonPlan as redundancyReplicationLessonPlan} from './redundancy-and-replication/lessonPlan';
import redundancyReplicationWords from './redundancy-and-replication/words.json';
import {lessonPlan as healthChecksLessonPlan} from './health-checks-and-failover/lessonPlan';
import healthChecksWords from './health-checks-and-failover/words.json';
import {lessonPlan as famousNinesLessonPlan} from './the-famous-nines/lessonPlan';
import famousNinesWords from './the-famous-nines/words.json';
import {lessonPlan as seriesParallelLessonPlan} from './series-vs-parallel-availability/lessonPlan';
import seriesParallelWords from './series-vs-parallel-availability/words.json';
import {lessonPlan as loadBalancingLessonPlan} from './load-balancing/lessonPlan';
import loadBalancingWords from './load-balancing/words.json';
import {lessonPlan as loadBalancingAlgorithmsLessonPlan} from './load-balancing-algorithms/lessonPlan';
import loadBalancingAlgorithmsWords from './load-balancing-algorithms/words.json';
import {lessonPlan as layer4Layer7LessonPlan} from './layer-4-vs-layer-7-load-balancing/lessonPlan';
import layer4Layer7Words from './layer-4-vs-layer-7-load-balancing/words.json';
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
  {
    id: 'SinglePointOfFailure',
    slug: 'single-point-of-failure',
    title: 'Single Point of Failures',
    subtitle: 'Availability Patterns #2',
    audioSrc: staticFile('audio/single-point-of-failure.mp3'),
    words: spofWords as WordTiming[],
    lessonPlan: spofLessonPlan,
  },
  {
    id: 'RedundancyAndReplication',
    slug: 'redundancy-and-replication',
    title: 'Redundancy & Replication',
    subtitle: 'Availability Patterns #3',
    audioSrc: staticFile('audio/redundancy-and-replication.mp3'),
    words: redundancyReplicationWords as WordTiming[],
    lessonPlan: redundancyReplicationLessonPlan,
  },
  {
    id: 'HealthChecksAndFailover',
    slug: 'health-checks-and-failover',
    title: 'Health Checks & Failover',
    subtitle: 'Availability Patterns #4',
    audioSrc: staticFile('audio/health-checks-and-failover.mp3'),
    words: healthChecksWords as WordTiming[],
    lessonPlan: healthChecksLessonPlan,
  },
  {
    id: 'FamousNines',
    slug: 'the-famous-nines',
    title: 'The Famous Nines',
    subtitle: 'Availability Patterns #5',
    audioSrc: staticFile('audio/the-famous-nines.mp3'),
    words: famousNinesWords as WordTiming[],
    lessonPlan: famousNinesLessonPlan,
  },
  {
    id: 'SeriesVsParallelAvailability',
    slug: 'series-vs-parallel-availability',
    title: 'Series vs Parallel Availability',
    subtitle: 'Availability Patterns #6',
    audioSrc: staticFile('audio/series-vs-parallel-availability.mp3'),
    words: seriesParallelWords as WordTiming[],
    lessonPlan: seriesParallelLessonPlan,
  },
  {
    id: 'LoadBalancing',
    slug: 'load-balancing',
    title: 'Load Balancing',
    subtitle: 'Availability Patterns #7',
    audioSrc: staticFile('audio/load-balancing.mp3'),
    words: loadBalancingWords as WordTiming[],
    lessonPlan: loadBalancingLessonPlan,
  },
  {
    id: 'LoadBalancingAlgorithms',
    slug: 'load-balancing-algorithms',
    title: 'Load Balancing Algorithms',
    subtitle: 'Availability Patterns #8',
    audioSrc: staticFile('audio/load-balancing-algorithms.mp3'),
    words: loadBalancingAlgorithmsWords as WordTiming[],
    lessonPlan: loadBalancingAlgorithmsLessonPlan,
  },
  {
    id: 'Layer4VsLayer7LoadBalancing',
    slug: 'layer-4-vs-layer-7-load-balancing',
    title: "Layer 4 vs Layer 7 Load Balancing: What's the Difference?",
    subtitle: 'Availability Patterns #9',
    audioSrc: staticFile('audio/layer-4-vs-layer-7-load-balancing.wav'),
    words: layer4Layer7Words as WordTiming[],
    lessonPlan: layer4Layer7LessonPlan,
  },
];

export const defaultVideo = videos[0];

