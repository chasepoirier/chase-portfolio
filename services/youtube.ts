"use server";
import { serverConfig } from "@/config-server";
import millify from "millify";

export const getYoutubeSubscriberCount = async () => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?${new URLSearchParams({
      id: "UCyeLrVCvHrAh3IBh2nMBS7g",
      part: "statistics",
      key: serverConfig.google.apiKey,
    }).toString()}`
  ).then((res) => res.json());

  const subCount = response?.items?.[0]?.statistics?.subscriberCount ?? "0";

  return millify(Number(subCount), { precision: 2 });
};
