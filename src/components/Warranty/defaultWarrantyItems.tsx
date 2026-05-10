import { Calendar, FileText, Shield, Wrench } from 'lucide-react';
import type { WarrantyItem } from './Warranty';

export const defaultWarrantyItems: WarrantyItem[] = [
  {
    icon: <FileText size={28} />,
    title: 'Basic Warranty',
    coverage: '3 Years / 36,000 Miles',
    description: 'Bumper-to-bumper limited warranty covering most vehicle components.',
  },
  {
    icon: <Wrench size={28} />,
    title: 'Powertrain Warranty',
    coverage: '5 Years / 60,000 Miles',
    description: 'Covers engine, transmission, and drivetrain components.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Corrosion Warranty',
    coverage: '6 Years / 100,000 Miles',
    description: 'Protection against rust-through corrosion on body panels.',
  },
  {
    icon: <Calendar size={28} />,
    title: 'Complimentary Maintenance',
    coverage: 'First Visit',
    description: 'Includes first scheduled maintenance service at no additional cost.',
  },
];
