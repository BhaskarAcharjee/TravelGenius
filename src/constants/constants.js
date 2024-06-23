import ExploreIcon from "@material-ui/icons/Explore";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoodIcon from "@material-ui/icons/Mood";
import ChatIcon from "@material-ui/icons/Chat";

export const steps = [
  {
    label: "City Name",
    icon: <ExploreIcon />,
    description: "Where do you want to go?",
  },
  {
    label: "Days",
    icon: <DateRangeIcon />,
    description: "How many days will you stay?",
  },
  {
    label: "Budget",
    icon: <AttachMoneyIcon />,
    description: "What is your budget level?",
  },
  {
    label: "Features",
    icon: <MoodIcon />,
    description: "Enter the features you like:",
    options: [
      {
        label: "Chill 🏖️",
        description: "We will loosen the trip schedule as much as possible.",
      },
      {
        label: "Nature 🏞️",
        description: "We will embrace attractions in natural settings.",
      },
      {
        label: "Urban 🏙️",
        description: "We will prioritize attractions in downtown areas.",
      },
    ],
  },
  {
    label: "AI Recommendation",
    icon: <ChatIcon />,
    description: "Loading AI Recommendation...",
  },
];
