import useAiringSchedule from "@/app/hooks/useAiringSchedule";
import type { TSchedule } from "@/app/utils/quries";
import { AnimatePresence, motion } from "motion/react";
type GroupedSchedules = Record<string, TSchedule[]>;
function AiringSchedule() {
  const { isLoading, error, data } = useAiringSchedule();

  const groupByDate = (schedules: TSchedule[]): GroupedSchedules => {
    return schedules.reduce((acc, item) => {
      const dateKey = new Date(item.airingAt * 1000).toDateString();
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(item);
      return acc;
    }, {} as GroupedSchedules);
  };
  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return date.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  if (isLoading) {
    return <div className="h-80 grow bg-red-800">Loading...</div>;
  }
  if (error || !data) {
    return <div className="h-80 grow bg-red-800">Error loading banner</div>;
  }
  const schedules = data.Page.airingSchedules || [];
  const grouped = groupByDate(schedules);
  return (
    <section className="px-6 py-8">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-semibold mb-6"
      >
        Estimated Schedule
      </motion.h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <AnimatePresence>
          <div className="flex gap-3">
            {Object.entries(grouped).map(([date]) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h2 style={{ marginBottom: 12 }}>{getDateLabel(date)}</h2>

              
            </motion.div>
          ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default AiringSchedule;
