import {TracePoint} from "../types";

export const MATCH_POINTS: TracePoint[] = [
    TracePoint.EVENT_ID,
    TracePoint.Container,
    TracePoint.Title,
];

export const IGNORE_URL = [
    '/backstage/message-center-3/my-msg-and-todo/msg-list',
    '/backstage/message-center-3/my-msg-and-todo/todo-list',
    '/api/v1/collect'
]