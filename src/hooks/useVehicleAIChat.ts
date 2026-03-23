import { useState, useCallback, useRef } from 'react';
import type { Vehicle } from '../types/vehicle';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface VehicleContext {
  name: string;
  year: string;
  make: string;
  model: string;
  priceMin: number;
  priceRange: string;
  staffRating: number;
  communityRating: number;
  horsepower?: number;
  mpg?: string;
  drivetrain: string;
  transmission: string;
  fuelType: string;
  bodyStyle: string;
  seatingCapacity?: number;
  cargoSpace?: number;
  editorsChoice?: boolean;
  tenBest?: boolean;
  evOfTheYear?: boolean;
  features?: string[];
}

function buildVehicleContext(vehicles: (Vehicle | null)[]): VehicleContext[] {
  return vehicles.filter((v): v is Vehicle => v !== null).map(v => ({
    name: `${v.year} ${v.make} ${v.model}`,
    year: v.year,
    make: v.make,
    model: v.model,
    priceMin: v.priceMin,
    priceRange: v.priceRange,
    staffRating: v.staffRating,
    communityRating: v.communityRating,
    horsepower: v.horsepower,
    mpg: v.mpg,
    drivetrain: v.drivetrain,
    transmission: v.transmission,
    fuelType: v.fuelType,
    bodyStyle: v.bodyStyle,
    seatingCapacity: v.seatingCapacity,
    cargoSpace: v.cargoSpace,
    editorsChoice: v.editorsChoice,
    tenBest: v.tenBest,
    evOfTheYear: v.evOfTheYear,
    features: v.features,
  }));
}

function generateResponse(query: string, ctx: VehicleContext[]): string {
  const q = query.toLowerCase();
  const names = ctx.map(v => `**${v.name}**`);

  if (ctx.length === 0) return 'Please select at least two vehicles to compare so I can help you.';

  if (q.includes('family') || q.includes('kid') || q.includes('children') || q.includes('road trip')) {
    const withSeats = ctx.filter(v => v.seatingCapacity && v.seatingCapacity >= 5);
    const withCargo = [...ctx].sort((a, b) => (b.cargoSpace || 0) - (a.cargoSpace || 0));
    if (withSeats.length > 0) {
      const best = withCargo[0];
      return `For families, the **${best.name}** stands out with ${best.seatingCapacity || 'ample'} seats and ${best.cargoSpace ? `**${best.cargoSpace} cu ft** of cargo space` : 'generous cargo room'}. ` +
        (best.mpg ? `It also delivers **${best.mpg} mpg**, which helps on long road trips. ` : '') +
        `Starting at **$${best.priceMin.toLocaleString()}**, it offers strong value for family needs. ` +
        (ctx.length > 1 ? `Among your selections, ${names.join(' and ')} are all worth considering, but the ${best.make} ${best.model} edges ahead for family practicality.` : '');
    }
    return `Among ${names.join(' and ')}, look for the one with the most seating and cargo space for family road trips. All are solid choices depending on your budget and size requirements.`;
  }

  if (q.includes('commute') || q.includes('city') || q.includes('daily') || q.includes('gas') || q.includes('fuel')) {
    const sorted = [...ctx].sort((a, b) => {
      const aMpg = a.mpg ? parseInt(a.mpg.split('/')[0]) : 0;
      const bMpg = b.mpg ? parseInt(b.mpg.split('/')[0]) : 0;
      return bMpg - aMpg;
    });
    const best = sorted[0];
    const cityMpg = best.mpg?.split('/')[0];
    return `For daily commuting, fuel efficiency is king. The **${best.name}** leads with ${cityMpg ? `**${cityMpg} mpg city**` : 'competitive fuel economy'}` +
      (best.fuelType !== 'Gas' ? ` and its **${best.fuelType}** powertrain` : '') +
      `. Starting at **$${best.priceMin.toLocaleString()}**, it's ${best.priceMin < 30000 ? 'an affordable' : 'a solid'} daily driver. ` +
      `The **${best.drivetrain}** drivetrain ${best.drivetrain === 'FWD' ? 'keeps costs low' : best.drivetrain === 'AWD' ? 'adds all-weather confidence' : 'provides good traction'}.`;
  }

  if (q.includes('safety') || q.includes('safe') || q.includes('crash') || q.includes('protect')) {
    const topRated = [...ctx].sort((a, b) => b.staffRating - a.staffRating)[0];
    const suvs = ctx.filter(v => v.bodyStyle === 'SUV' || v.bodyStyle === 'Truck');
    return `Safety is a top priority. The **${topRated.name}** earns our highest C/D rating at **${topRated.staffRating.toFixed(1)}/10**, which factors in safety performance. ` +
      (suvs.length > 0 ? `${suvs.map(v => `The **${v.name}**`).join(' and ')} ${suvs.length === 1 ? 'offers' : 'offer'} the added peace of mind that comes with a larger vehicle footprint. ` : '') +
      `All modern vehicles in this comparison come with standard safety tech like automatic emergency braking, lane-keeping assist, and adaptive cruise control. Check NHTSA and IIHS ratings for detailed crash-test scores.`;
  }

  if (q.includes('cargo') || q.includes('space') || q.includes('storage') || q.includes('trunk') || q.includes('haul')) {
    const sorted = [...ctx].sort((a, b) => (b.cargoSpace || 0) - (a.cargoSpace || 0));
    const best = sorted[0];
    if (best.cargoSpace) {
      return `The **${best.name}** leads in cargo space with **${best.cargoSpace} cu ft**, making it the best choice for hauling gear. ` +
        (sorted.length > 1 && sorted[1].cargoSpace ? `The **${sorted[1].name}** follows with **${sorted[1].cargoSpace} cu ft**. ` : '') +
        `Body style matters here — ${best.bodyStyle === 'SUV' ? 'SUVs' : best.bodyStyle === 'Truck' ? 'trucks' : `${best.bodyStyle.toLowerCase()}s`} naturally offer more versatile cargo configurations.`;
    }
    return `Among ${names.join(' and ')}, SUVs and trucks generally offer the most cargo space. Check the detailed specs above for exact measurements.`;
  }

  if (q.includes('fast') || q.includes('speed') || q.includes('power') || q.includes('performance') || q.includes('horse') || q.includes('quick') || q.includes('accelerat')) {
    const sorted = [...ctx].sort((a, b) => (b.horsepower || 0) - (a.horsepower || 0));
    const best = sorted[0];
    if (best.horsepower) {
      return `The **${best.name}** leads in raw power with **${best.horsepower} hp** and a **${best.transmission}** transmission. ` +
        (sorted.length > 1 && sorted[1].horsepower ? `The **${sorted[1].name}** follows with **${sorted[1].horsepower} hp**. ` : '') +
        `The **${best.drivetrain}** drivetrain ${best.drivetrain === 'AWD' ? 'puts that power to all four wheels for maximum traction' : best.drivetrain === 'RWD' ? 'delivers a more engaging driving experience' : 'prioritizes efficiency'}. ` +
        `Keep in mind that horsepower isn't everything — vehicle weight, gearing, and turbo lag all affect real-world acceleration.`;
    }
    return `Check the performance specs above for horsepower comparisons. The C/D rating factors in driving dynamics beyond just raw numbers.`;
  }

  if (q.includes('cheap') || q.includes('afford') || q.includes('budget') || q.includes('value') || q.includes('price') || q.includes('cost') || q.includes('money') || q.includes('worth')) {
    const sorted = [...ctx].sort((a, b) => a.priceMin - b.priceMin);
    const cheapest = sorted[0];
    const priciest = sorted[sorted.length - 1];
    const diff = priciest.priceMin - cheapest.priceMin;
    return `The **${cheapest.name}** is the most affordable option starting at **$${cheapest.priceMin.toLocaleString()}**` +
      (diff > 0 ? `, which is **$${diff.toLocaleString()} less** than the **${priciest.name}** at **$${priciest.priceMin.toLocaleString()}**` : '') +
      `. ` +
      (cheapest.staffRating >= 8 ? `With a C/D rating of **${cheapest.staffRating.toFixed(1)}/10**, it punches well above its price point. ` : '') +
      `For the best overall value, consider the ratio of features and ratings to price — sometimes spending a bit more gets you significantly better equipment and driving experience.`;
  }

  if (q.includes('winter') || q.includes('snow') || q.includes('ice') || q.includes('weather') || q.includes('traction')) {
    const awdVehicles = ctx.filter(v => v.drivetrain === 'AWD' || v.drivetrain === '4WD');
    if (awdVehicles.length > 0) {
      return `For winter driving, ${awdVehicles.map(v => `the **${v.name}** (${v.drivetrain})`).join(' and ')} ${awdVehicles.length === 1 ? 'has' : 'have'} the advantage with all-wheel or four-wheel drive. ` +
        `${awdVehicles[0].bodyStyle === 'SUV' ? 'The higher ground clearance of an SUV also helps in deep snow. ' : ''}` +
        `Remember that good winter tires matter more than drivetrain — even an AWD vehicle needs proper tires for ice and packed snow.`;
    }
    return `None of your selected vehicles come standard with AWD/4WD in the base trim, but many offer it as an option. For serious winter driving, look for available AWD packages and invest in dedicated winter tires.`;
  }

  if (q.includes('electric') || q.includes('ev') || q.includes('hybrid') || q.includes('plug') || q.includes('charg') || q.includes('battery')) {
    const evs = ctx.filter(v => v.fuelType === 'Electric' || v.fuelType === 'Hybrid' || v.fuelType === 'Plug-in Hybrid');
    if (evs.length > 0) {
      return `Among your selections, ${evs.map(v => `the **${v.name}** (${v.fuelType})`).join(' and ')} ${evs.length === 1 ? 'offers' : 'offer'} electrified powertrains. ` +
        (evs[0].fuelType === 'Electric' ? `As a full EV, the ${evs[0].make} ${evs[0].model} produces zero tailpipe emissions and typically has lower running costs. ` : `Hybrid technology gives you improved fuel economy without range anxiety. `) +
        `Consider your daily driving distance and charging infrastructure when deciding between electric, hybrid, and gas powertrains.`;
    }
    return `Your current selections are all conventional gas-powered vehicles. If you're interested in electrified options, consider adding a hybrid or EV to your comparison to see how they stack up.`;
  }

  if (q.includes('award') || q.includes('editor') || q.includes('10best') || q.includes('best') || q.includes('recommend') || q.includes('which') || q.includes('should i') || q.includes('pick')) {
    const awarded = ctx.filter(v => v.editorsChoice || v.tenBest || v.evOfTheYear);
    const topRated = [...ctx].sort((a, b) => b.staffRating - a.staffRating)[0];
    let response = `Based on our testing, the **${topRated.name}** earns the top C/D rating at **${topRated.staffRating.toFixed(1)}/10**. `;
    if (awarded.length > 0) {
      const awards = awarded.map(v => {
        const a = [];
        if (v.editorsChoice) a.push("Editor's Choice");
        if (v.tenBest) a.push('10Best');
        if (v.evOfTheYear) a.push('EV of the Year');
        return `**${v.name}** (${a.join(', ')})`;
      });
      response += `Award winners include ${awards.join(' and ')}. `;
    }
    response += `The "best" choice depends on your priorities — if you value performance, look at horsepower and driving dynamics. For practicality, focus on cargo space and fuel economy. For value, compare features at each price point.`;
    return response;
  }

  const topRated = [...ctx].sort((a, b) => b.staffRating - a.staffRating)[0];
  const cheapest = [...ctx].sort((a, b) => a.priceMin - b.priceMin)[0];
  return `Great question! Here's what I can tell you about ${names.join(' and ')}: ` +
    `The **${topRated.name}** has our highest rating at **${topRated.staffRating.toFixed(1)}/10**` +
    (topRated.name !== cheapest.name ? `, while the **${cheapest.name}** is the most affordable starting at **$${cheapest.priceMin.toLocaleString()}**` : '') +
    `. Each vehicle has its strengths — try asking about specific topics like "best for families", "most fuel efficient", "best value", or "best for winter driving" and I'll give you a detailed breakdown.`;
}

export function useVehicleAIChat(vehicles: (Vehicle | null)[]) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const idCounter = useRef(0);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg-${++idCounter.current}`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const ctx = buildVehicleContext(vehicles);
    const responseText = generateResponse(trimmed, ctx);

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `msg-${++idCounter.current}`,
        role: 'assistant',
        content: responseText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  }, [vehicles, isTyping]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
  }, []);

  return { messages, isTyping, sendMessage, clearChat };
}
