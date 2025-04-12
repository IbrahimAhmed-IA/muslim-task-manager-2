"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/language-context";

export default function PrayerTimes() {
  const { t, language } = useLanguage();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Get user's location for prayer times
  useEffect(() => {
    const getLocation = () => {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  // Fetch prayer times based on location
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      if (location) {
        try {
          const today = new Date();
          const date = today.toISOString().split("T")[0];

          const response = await fetch(
            `https://api.aladhan.com/v1/timings/${date}?latitude=${location.lat}&longitude=${location.lng}&method=2`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch prayer times");
          }

          const data = await response.json();
          setPrayerTimes(data.data.timings);
        } catch (error) {
          console.error("Error fetching prayer times:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (location) {
      fetchPrayerTimes();
    }
  }, [location]);

  // Format time to 12-hour format
  const formatTime = (time: string) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${ampm}`;
  };

  // Calculate next prayer
  const getNextPrayer = () => {
    if (!prayerTimes) return null;

    const prayers = [
      { name: t('prayer.fajr'), time: prayerTimes.Fajr },
      { name: t('prayer.dhuhr'), time: prayerTimes.Dhuhr },
      { name: t('prayer.asr'), time: prayerTimes.Asr },
      { name: t('prayer.maghrib'), time: prayerTimes.Maghrib },
      { name: t('prayer.isha'), time: prayerTimes.Isha },
    ];

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    for (const prayer of prayers) {
      const [prayerHour, prayerMinute] = prayer.time.split(":").map(Number);
      if (
        prayerHour > currentHour ||
        (prayerHour === currentHour && prayerMinute > currentMinute)
      ) {
        return prayer;
      }
    }

    // If all prayers have passed for today, return Fajr for tomorrow
    return { name: `${t('prayer.fajr')} (${language === 'ar' ? 'غداً' : 'Tomorrow'})`, time: prayerTimes.Fajr };
  };

  const nextPrayer = prayerTimes ? getNextPrayer() : null;

  return (
    <Card className="p-4 bg-white shadow-sm" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h2 className="text-lg font-semibold mb-2">{t('worship.prayerTimes')}</h2>

      {loading ? (
        <div className="flex items-center justify-center py-3">
          <div className="w-full max-w-md">
            <Progress value={30} className="h-2" />
            <p className="text-center mt-2 text-sm text-gray-500">
              {t('worship.loadingPrayer')}
            </p>
          </div>
        </div>
      ) : prayerTimes ? (
        <div>
          {nextPrayer && (
            <div className="mb-3 bg-blue-50 p-2 rounded-md">
              <p className="text-sm text-blue-700">
                {language === 'ar' ? 'الصلاة القادمة:' : 'Next prayer:'} <span className="font-semibold">{nextPrayer.name}</span> {language === 'ar' ? 'في' : 'at'}{" "}
                <span className="font-semibold">{formatTime(nextPrayer.time)}</span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div>
              <div className="font-medium text-purple-700">{t('prayer.fajr')}</div>
              <div>{formatTime(prayerTimes.Fajr)}</div>
            </div>
            <div>
              <div className="font-medium text-blue-700">{t('prayer.dhuhr')}</div>
              <div>{formatTime(prayerTimes.Dhuhr)}</div>
            </div>
            <div>
              <div className="font-medium text-teal-700">{t('prayer.asr')}</div>
              <div>{formatTime(prayerTimes.Asr)}</div>
            </div>
            <div>
              <div className="font-medium text-amber-700">{t('prayer.maghrib')}</div>
              <div>{formatTime(prayerTimes.Maghrib)}</div>
            </div>
            <div>
              <div className="font-medium text-indigo-700">{t('prayer.isha')}</div>
              <div>{formatTime(prayerTimes.Isha)}</div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center py-2 text-sm">
          {t('worship.allowLocation')}
        </p>
      )}
    </Card>
  );
}
