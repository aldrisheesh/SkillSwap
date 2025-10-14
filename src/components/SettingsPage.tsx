import { ScrollArea } from './ui/scroll-area';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ArrowLeft, ChevronRight, Bell, Shield, Globe, Moon, User, MapPin, CreditCard } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  return (
    <div className="h-full flex flex-col bg-[#FDF4E3]">
      {/* Header */}
      <div className="bg-[#134686] text-white p-4">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl">Settings</h2>
        </div>
        <p className="text-sm opacity-80 ml-14">Manage your app preferences</p>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Account Settings */}
          <div className="bg-white rounded-xl p-4 border-2 border-[#134686]/10">
            <h3 className="text-[#134686] mb-3">Account</h3>
            <div className="space-y-3">
              <SettingItem icon={User} label="Edit Profile" />
              <SettingItem icon={CreditCard} label="Payment Methods" />
              <SettingItem icon={MapPin} label="Location Settings" />
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl p-4 border-2 border-[#134686]/10">
            <h3 className="text-[#134686] mb-3">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-[#134686]" />
                  <div>
                    <p className="text-[#134686]">Push Notifications</p>
                    <p className="text-xs text-[#134686]/60">Receive app notifications</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#134686]">New Messages</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#134686]">Booking Updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#134686]">Community Updates</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-xl p-4 border-2 border-[#134686]/10">
            <h3 className="text-[#134686] mb-3">Privacy & Security</h3>
            <div className="space-y-3">
              <SettingItem icon={Shield} label="Privacy Settings" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#134686]">Show Online Status</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#134686]">Share Location</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl p-4 border-2 border-[#134686]/10">
            <h3 className="text-[#134686] mb-3">Preferences</h3>
            <div className="space-y-3">
              <SettingItem icon={Globe} label="Language" value="English" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-[#134686]" />
                  <div>
                    <p className="text-[#134686]">Dark Mode</p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl p-4 border-2 border-[#ED3F27]/20">
            <h3 className="text-[#ED3F27] mb-3">Danger Zone</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full border-[#ED3F27] text-[#ED3F27] hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </div>

          <div className="text-center text-xs text-[#134686]/60 py-4">
            SkillSwap v1.0.0
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function SettingItem({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) {
  return (
    <button className="w-full flex items-center justify-between p-2 hover:bg-[#FDF4E3] rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#134686]" />
        <span className="text-[#134686]">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-[#134686]/60">{value}</span>}
        <ChevronRight className="w-4 h-4 text-[#134686]/40" />
      </div>
    </button>
  );
}
