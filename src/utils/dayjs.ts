import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "now",
    past: "%s",
    s: "1s ago",
    ss: "%ss ago",
    m: "1m ago",
    mm: "%dm ago",
    h: "1h ago",
    hh: "%dh ago",
    d: "1d ago",
    dd: "%dd ago",
    M: "1M ago",
    MM: "%dM ago",
    y: "1Y ago",
    yy: "%dY ago"
  }
});

export const getRelativeTime = (date: string) =>
  dayjs(date).diff(Date.now(), "day") > -7
    ? dayjs(date).fromNow()
    : dayjs(date).format("MMM D");

export default dayjs;
