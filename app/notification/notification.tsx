import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@radix-ui/react-switch";

export default function Notifications() {
  // Categories and notifications structure
  const categories = [
    {
      title: 'Device Status',
      description: 'Alerts for when a device goes offline or comes online.',
      notifications: [
        { label: 'Device Status', description: 'Alerts for device status changes.' },
        { label: 'Health Issues', description: 'Notifications about devices with hardware problems.' },
        { label: 'Software Updates', description: 'Inform users about required or available updates.' },
        { label: 'Unauthorized Access', description: 'Notifications for failed login attempts.' },
        { label: 'Connection Issues', description: 'Alerts for devices with poor network connectivity.' },
      ]
    },
    {
      title: 'Content Notifications',
      description: 'Notifications related to content management.',
      notifications: [
        { label: 'Content Upload', description: 'Success or failure of a content upload.' },
        { label: 'Playback Errors', description: 'Notifications about failed content playback.' },
        { label: 'Schedule Conflicts', description: 'Alerts for overlapping playlists or schedules.' },
        { label: 'Content Expiry', description: 'Warnings about expiring or expired content.' },
      ]
    },
    {
      title: 'User Account Notifications',
      description: 'Notifications for user account management.',
      notifications: [
        { label: 'Role Changes', description: 'Notifications for changes in user roles.' },
        { label: 'Password Resets', description: 'Success or failed password reset attempts.' },
        { label: 'Team Collaboration', description: 'Notifications for changes in shared projects.' },
      ]
    },
    {
      title: 'Customizable Alerts',
      description: 'Custom notifications for admins to create specific alerts.',
      notifications: [
        { label: 'Threshold Alerts', description: 'E.g., notification if a device is offline for more than 10 minutes.' },
        { label: 'Action Triggers', description: 'E.g., alert if content is not published within a timeframe.' },
      ]
    },
  ];

  // State to manage each individual switch for each notification
  const [toggledStates, setToggledStates] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (key: string) => {
    setToggledStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle the state for the clicked notification
    }));
  };

  const handleSaveChanges = () => {
    // Save the toggled values (this could be an API call or state update)
    console.log("Saved toggled states:", toggledStates);
    // Close the dialog or perform any other action
  };

  return (
<div className="space-y-8 p-6 w-full max-w-7xl mx-auto">
<h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      <p className="text-gray-600 mb-8">Configure how you receive notifications.</p>

      <div className="max-h-[400px] overflow-y-auto space-y-4">
        {categories.map((category, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold">{category.title}</h2>
            <p className="text-gray-500 mb-4">{category.description}</p>
            {category.notifications.map((notification, idx) => {
              // Generate a unique key for each notification toggle state
              const notificationKey = `${category.title}-${notification.label}`;

              return (
                <div key={idx} className="flex justify-between items-center py-2 px-4 border-b border-gray-200">
                  <div className="flex-1">
                    <strong>{notification.label}</strong>
                    <p className="text-gray-500 text-sm">{notification.description}</p>
                  </div>
                  <Switch
                    checked={toggledStates[notificationKey] || false} // Use the specific state for each notification
                    onCheckedChange={() => handleToggle(notificationKey)} // Toggle only the specific notification
                    className={`w-12 h-6 rounded-full transition-all duration-200 ease-in-out
                      ${toggledStates[notificationKey] ? 'bg-green-500' : 'bg-gray-400'} 
                      relative`}>
                    <span
                      className={`absolute top-0 left-0 transform transition-all duration-200 ease-in-out
                        ${toggledStates[notificationKey] ? 'translate-x-6' : 'translate-x-0'} 
                        w-6 h-6 bg-white rounded-full`}>
                    </span>
                  </Switch>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} className="w-32 mt-4">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
