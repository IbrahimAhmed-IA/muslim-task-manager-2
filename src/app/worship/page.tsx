"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import MainLayout from "@/components/layout/main-layout";
import Providers from "@/providers";
import { useLanguage } from "@/context/language-context";

function WorshipPageContent() {
  const { t, language } = useLanguage();
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [loadingAzan, setLoadingAzan] = useState(false);

  // Pre-defined worship tasks
  const worshipTasks = [
    { title: "Fajr Prayer", description: "Perform Fajr prayer and 2 sunnah raka'ahs" },
    { title: "Dhuhur Prayer", description: "Perform Dhuhur prayer and 4 sunnah raka'ahs" },
    { title: "Asr Prayer", description: "Perform Asr prayer and 2 sunnah raka'ahs" },
    { title: "Maghrib Prayer", description: "Perform Maghrib prayer and 2 sunnah raka'ahs" },
    { title: "Isha Prayer", description: "Perform Isha prayer and 2 sunnah raka'ahs" },
    { title: "Quran Reading", description: "Read at least 1 page of Quran" },
    { title: "Dhikr", description: "Morning and evening adhkar" },
    { title: "Dua", description: "Make personal dua and pray for others" },
    { title: "Charity", description: "Give sadaqah (charity) if possible" },
  ];

  // Get user's location for prayer times
  useEffect(() => {
    const getLocation = () => {
      setLoadingAzan(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            setLoadingAzan(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoadingAzan(false);
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
          const date = today.toISOString().split('T')[0];

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
          setLoadingAzan(false);
        }
      }
    };

    if (location) {
      fetchPrayerTimes();
    }
  }, [location]);

  return (
    <div className="p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mb-6">
        <p className="text-gray-600">{t('worship.description')}</p>
      </div>

      {/* Azan Times Card */}
      <Card className="p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t('worship.prayerTimes')}</h2>
        {loadingAzan ? (
          <div className="flex items-center justify-center py-4">
            <div className="w-full max-w-md">
              <Progress value={30} className="h-2" />
              <p className="text-center mt-2 text-sm text-gray-500">
                {t('worship.loadingPrayer')}
              </p>
            </div>
          </div>
        ) : prayerTimes ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="font-medium text-purple-800">{t('prayer.fajr')}</div>
              <div className="text-lg font-semibold">{prayerTimes.Fajr}</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="font-medium text-blue-800">{t('prayer.dhuhr')}</div>
              <div className="text-lg font-semibold">{prayerTimes.Dhuhr}</div>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg text-center">
              <div className="font-medium text-teal-800">{t('prayer.asr')}</div>
              <div className="text-lg font-semibold">{prayerTimes.Asr}</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg text-center">
              <div className="font-medium text-amber-800">{t('prayer.maghrib')}</div>
              <div className="text-lg font-semibold">{prayerTimes.Maghrib}</div>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg text-center">
              <div className="font-medium text-indigo-800">{t('prayer.isha')}</div>
              <div className="text-lg font-semibold">{prayerTimes.Isha}</div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center py-2">
            {t('worship.allowLocation')}
          </p>
        )}
      </Card>

      {/* Worship Tasks List */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">{t('worship.tasks')}</h2>
        <div className="space-y-3">
          {worshipTasks.map((task, index) => (
            <div key={index} className="flex items-start p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <Button
                variant="outline"
                className="ml-2"
                onClick={() => alert(`Task '${task.title}' will be added in the full version.`)}
              >
                {t('worship.addToTasks')}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function WorshipPage() {
  return (
    <Providers>
      <MainLayout>
        <WorshipPageContent />
      </MainLayout>
    </Providers>
  );
}

export const dynamic = "force-dynamic";
