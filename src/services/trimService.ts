// Trim Service - Provides accurate trim data for all vehicles

export interface TrimData {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

interface VehicleTrims {
  [key: string]: TrimData[];
}

// Comprehensive trim data for all vehicles
const vehicleTrims: VehicleTrims = {
  // ============== CHEVROLET ==============
  'Chevrolet Trax': [
    { id: 'ls', name: 'LS', price: '$21,895', features: ['8.0" touchscreen', 'Wireless Apple CarPlay/Android Auto', 'Lane Keep Assist', 'Auto Emergency Braking', 'Rear Camera'] },
    { id: '1rs', name: '1RS', price: '$23,195', features: ['All LS features', 'Sport styling', '17" alloy wheels', 'Sport pedals', 'Enhanced accents'] },
    { id: 'lt', name: 'LT', price: '$23,395', recommended: true, features: ['11.0" touchscreen', 'Wireless charging', 'Remote start', 'Heated seats available', 'Heated steering wheel'] },
    { id: 'rs', name: 'RS', price: '$24,995', features: ['All LT features', 'Sport suspension', '19" black wheels', 'Black accents', 'RS interior trim'] },
    { id: 'activ', name: 'ACTIV', price: '$24,995', features: ['All LT features', 'Rugged styling', 'Skid plate', 'Chrome accents', 'All-terrain design'] },
  ],
  'Chevrolet Trailblazer': [
    { id: 'ls', name: 'LS', price: '$24,995', features: ['7.0" touchscreen', 'Apple CarPlay/Android Auto', 'Auto Emergency Braking', 'Lane Keep Assist', 'Rear Camera'] },
    { id: 'lt', name: 'LT', price: '$27,295', recommended: true, features: ['8.0" touchscreen', 'Wireless charging', 'Remote start', 'Heated seats', 'Power driver seat'] },
    { id: 'activ', name: 'ACTIV', price: '$29,995', features: ['All LT features', 'AWD', 'Unique styling', 'Off-road suspension', 'All-terrain tires'] },
    { id: 'rs', name: 'RS', price: '$31,895', features: ['All LT features', 'Sport suspension', '18" black wheels', 'Sport styling', 'RS interior'] },
  ],
  'Chevrolet Bolt EV': [
    { id: '1lt', name: '1LT', price: '$27,495', features: ['10.2" touchscreen', 'Wireless Apple CarPlay', 'DC Fast Charging', 'Regen on Demand', 'One Pedal Driving'] },
    { id: '2lt', name: '2LT', price: '$31,495', recommended: true, features: ['All 1LT features', 'Surround Vision', 'Rear Camera Mirror', 'Leather seats', 'Bose audio'] },
  ],
  'Chevrolet Camaro': [
    { id: '1ls', name: '1LS', price: '$29,100', features: ['8.0" touchscreen', '275hp Turbo I4', '6-speed manual', 'Rear Camera', 'Keyless entry'] },
    { id: '1lt', name: '1LT', price: '$30,700', features: ['All LS features', 'RS Appearance', 'HID headlamps', 'Dual exhaust', 'Sport suspension'] },
    { id: '2lt', name: '2LT', price: '$32,700', recommended: true, features: ['All 1LT features', 'Leather seats', 'Heated/ventilated seats', 'Bose audio', 'Head-up display'] },
    { id: 'ss', name: 'SS', price: '$44,100', features: ['6.2L V8 455hp', 'Magnetic Ride Control', 'Performance exhaust', 'Brembo brakes', 'Launch control'] },
    { id: 'zl1', name: 'ZL1', price: '$71,700', features: ['6.2L Supercharged V8 650hp', 'Carbon fiber hood', 'Track-ready suspension', 'Recaro seats', 'Performance data recorder'] },
  ],
  'Chevrolet Corvette': [
    { id: '1lt', name: '1LT', price: '$66,300', features: ['6.2L V8 490hp', '8-speed DCT', '12" digital cluster', 'Performance exhaust', 'Bose audio'] },
    { id: '2lt', name: '2LT', price: '$74,700', recommended: true, features: ['All 1LT features', 'GT2 seats', 'Head-up display', 'Performance data recorder', 'Front lift'] },
    { id: '3lt', name: '3LT', price: '$80,500', features: ['All 2LT features', 'Napa leather', 'Suede microfiber', 'Carbon fiber trim', 'Memory seats'] },
    { id: 'z06', name: 'Z06', price: '$115,700', features: ['5.5L Flat-plane V8 670hp', 'Carbon fiber wheels avail', 'Z07 package avail', 'Track-focused suspension', 'Carbon ceramic brakes'] },
  ],
  'Chevrolet Colorado': [
    { id: 'wt', name: 'WT', price: '$30,695', features: ['11.3" touchscreen', 'Apple CarPlay/Android Auto', '2.7L Turbo', 'Trailering package', 'Teen Driver'] },
    { id: 'lt', name: 'LT', price: '$35,595', recommended: true, features: ['All WT features', 'LED headlights', 'Remote start', 'Heated seats', 'Power driver seat'] },
    { id: 'z71', name: 'Z71', price: '$41,595', features: ['All LT features', 'Off-road suspension', 'Skid plates', 'Hill Descent Control', 'All-terrain tires'] },
    { id: 'trail-boss', name: 'Trail Boss', price: '$44,095', features: ['All Z71 features', '2" lift', 'Multimatic DSSV dampers', 'Underbody cameras', 'Front/rear locking diffs'] },
    { id: 'zr2', name: 'ZR2', price: '$50,695', features: ['All Trail Boss features', 'Multimatic spool-valve dampers', 'Front e-locker', 'Wider track', 'Desert racing heritage'] },
  ],
  'Chevrolet Silverado': [
    { id: 'wt', name: 'WT', price: '$37,645', features: ['2.7L Turbo', '7.0" touchscreen', 'Apple CarPlay', 'Trailering package', 'Auto Emergency Braking'] },
    { id: 'custom', name: 'Custom', price: '$42,595', features: ['All WT features', '20" wheels', 'LED headlights', 'Remote start', 'Body-color bumpers'] },
    { id: 'lt', name: 'LT', price: '$47,695', recommended: true, features: ['All Custom features', '5.3L V8', '13.4" touchscreen', 'Heated seats', 'Power driver seat'] },
    { id: 'rst', name: 'RST', price: '$52,995', features: ['All LT features', 'Sport styling', 'Heated steering wheel', 'Wireless charging', 'Bose audio'] },
    { id: 'ltz', name: 'LTZ', price: '$55,995', features: ['All RST features', 'Leather seats', 'Ventilated seats', 'Surround Vision', 'Adaptive cruise'] },
    { id: 'high-country', name: 'High Country', price: '$62,795', features: ['All LTZ features', '6.2L V8', 'Super Cruise avail', 'Premium leather', 'Exclusive styling'] },
  ],
  'Chevrolet Tahoe': [
    { id: 'ls', name: 'LS', price: '$56,200', features: ['5.3L V8', '10.2" touchscreen', 'Apple CarPlay', 'Tri-zone climate', 'Teen Driver'] },
    { id: 'lt', name: 'LT', price: '$61,200', recommended: true, features: ['All LS features', 'Leather seats', 'Heated seats', 'Power liftgate', 'Remote start'] },
    { id: 'rst', name: 'RST', price: '$64,300', features: ['All LT features', 'Performance exhaust', '22" wheels', 'Sport styling', 'Magnetic Ride Control'] },
    { id: 'z71', name: 'Z71', price: '$66,300', features: ['All LT features', '4WD', 'Off-road suspension', 'Skid plates', 'Hill Descent Control'] },
    { id: 'premier', name: 'Premier', price: '$70,600', features: ['All LT features', 'Power folding seats', 'Rear seat media', 'Air suspension', 'HD Surround Vision'] },
    { id: 'high-country', name: 'High Country', price: '$76,500', features: ['All Premier features', '6.2L V8', 'Super Cruise', 'Premium leather', 'Exclusive trim'] },
  ],
  'Chevrolet Suburban': [
    { id: 'ls', name: 'LS', price: '$58,200', features: ['5.3L V8', '10.2" touchscreen', '9 passenger seating', 'Tri-zone climate', 'Apple CarPlay'] },
    { id: 'lt', name: 'LT', price: '$63,900', recommended: true, features: ['All LS features', 'Leather seats', 'Heated seats', 'Power liftgate', 'Bose audio'] },
    { id: 'rst', name: 'RST', price: '$67,400', features: ['All LT features', '22" wheels', 'Sport styling', 'Magnetic Ride Control', 'Performance exhaust'] },
    { id: 'z71', name: 'Z71', price: '$69,400', features: ['All LT features', '4WD', 'Off-road suspension', 'Skid plates', 'Z71 badging'] },
    { id: 'premier', name: 'Premier', price: '$73,500', features: ['All LT features', 'Power folding seats', 'Air suspension', 'Rear media', 'HD Surround Vision'] },
    { id: 'high-country', name: 'High Country', price: '$79,500', features: ['All Premier features', '6.2L V8', 'Super Cruise', 'Premium leather', 'Exclusive styling'] },
  ],

  // ============== HONDA ==============
  'Honda HR-V': [
    { id: 'lx', name: 'LX', price: '$25,050', features: ['7.0" touchscreen', 'Apple CarPlay/Android Auto', 'Honda Sensing', 'Auto climate', 'LED headlights'] },
    { id: 'sport', name: 'Sport', price: '$27,550', recommended: true, features: ['All LX features', '9.0" touchscreen', 'Wireless charging', 'Fog lights', 'Sport pedals'] },
    { id: 'ex-l', name: 'EX-L', price: '$30,050', features: ['All Sport features', 'Leather seats', 'Heated seats', 'Moonroof', 'Bose audio'] },
  ],
  'Honda Civic': [
    { id: 'lx', name: 'LX', price: '$24,950', features: ['7.0" touchscreen', 'Apple CarPlay/Android Auto', 'Honda Sensing', 'Auto climate', 'LED headlights'] },
    { id: 'sport', name: 'Sport', price: '$27,050', features: ['All LX features', '18" wheels', 'Sport pedals', 'Rear spoiler', 'Chrome exhaust'] },
    { id: 'ex', name: 'EX', price: '$28,650', recommended: true, features: ['All Sport features', '9.0" touchscreen', 'Wireless charging', 'Moonroof', 'Remote start'] },
    { id: 'touring', name: 'Touring', price: '$31,450', features: ['All EX features', 'Leather seats', 'Heated seats', 'Bose audio', 'Navigation'] },
  ],
  'Honda Accord': [
    { id: 'lx', name: 'LX', price: '$28,990', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Honda Sensing', 'Auto climate', 'LED headlights'] },
    { id: 'ex', name: 'EX', price: '$31,610', features: ['All LX features', '12.3" touchscreen', 'Wireless charging', 'Moonroof', 'Remote start'] },
    { id: 'sport', name: 'Sport', price: '$32,990', recommended: true, features: ['All EX features', '19" wheels', 'Sport styling', 'Rear spoiler', 'Dual exhaust'] },
    { id: 'ex-l', name: 'EX-L', price: '$34,510', features: ['All EX features', 'Leather seats', 'Heated seats', 'Memory seats', 'Bose audio'] },
    { id: 'touring', name: 'Touring', price: '$38,990', features: ['All EX-L features', 'Ventilated seats', 'Head-up display', 'Parking sensors', 'Premium audio'] },
  ],
  'Honda CR-V': [
    { id: 'lx', name: 'LX', price: '$30,050', features: ['7.0" touchscreen', 'Apple CarPlay/Android Auto', 'Honda Sensing', 'Auto climate', 'LED headlights'] },
    { id: 'ex', name: 'EX', price: '$33,150', recommended: true, features: ['All LX features', '9.0" touchscreen', 'Wireless charging', 'Moonroof', 'Remote start'] },
    { id: 'ex-l', name: 'EX-L', price: '$36,250', features: ['All EX features', 'Leather seats', 'Heated seats', 'Power liftgate', 'Memory seats'] },
    { id: 'touring', name: 'Touring', price: '$39,550', features: ['All EX-L features', 'Ventilated seats', 'Wireless CarPlay', 'Bose audio', 'Navigation'] },
  ],
  'Honda Pilot': [
    { id: 'lx', name: 'LX', price: '$40,250', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Honda Sensing', 'Tri-zone climate', 'LED headlights'] },
    { id: 'ex', name: 'EX', price: '$43,650', features: ['All LX features', 'Power liftgate', 'Moonroof', 'Heated seats', 'Remote start'] },
    { id: 'ex-l', name: 'EX-L', price: '$46,600', recommended: true, features: ['All EX features', 'Leather seats', 'Memory seats', 'Bose audio', 'Wireless charging'] },
    { id: 'touring', name: 'Touring', price: '$50,550', features: ['All EX-L features', 'Ventilated seats', 'Rear entertainment', 'Navigation', 'Parking sensors'] },
    { id: 'trailsport', name: 'TrailSport', price: '$49,050', features: ['All EX-L features', 'AWD', 'All-terrain tires', 'Steel skid plates', 'Trail-tuned suspension'] },
    { id: 'elite', name: 'Elite', price: '$53,650', features: ['All Touring features', 'Panoramic roof', 'Heads-up display', 'Wireless charging', 'CabinWatch'] },
  ],

  // ============== TOYOTA ==============
  'Toyota Corolla': [
    { id: 'l', name: 'L', price: '$22,050', features: ['7.0" touchscreen', 'Apple CarPlay/Android Auto', 'Toyota Safety Sense', 'LED headlights', 'Auto climate'] },
    { id: 'le', name: 'LE', price: '$23,150', features: ['All L features', '8.0" touchscreen', 'Blind spot monitor', 'Rear cross traffic alert', 'Upgraded audio'] },
    { id: 'se', name: 'SE', price: '$25,550', recommended: true, features: ['All LE features', 'Sport suspension', '18" wheels', 'Sport seats', 'Paddle shifters'] },
    { id: 'xle', name: 'XLE', price: '$27,050', features: ['All LE features', 'SofTex seats', 'Heated seats', '9.0" touchscreen', 'JBL audio'] },
    { id: 'xse', name: 'XSE', price: '$28,600', features: ['All SE + XLE features', 'Dual exhaust', 'Sport styling', 'Premium audio', 'Moonroof'] },
  ],
  'Toyota Corolla Cross': [
    { id: 'l', name: 'L', price: '$24,035', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Toyota Safety Sense 2.0', 'LED headlights', 'Fabric seats'] },
    { id: 'le', name: 'LE', price: '$26,485', recommended: true, features: ['All L features', 'Blind spot monitor', 'Rear cross traffic alert', 'Roof rails', 'Power liftgate'] },
    { id: 'xle', name: 'XLE', price: '$29,685', features: ['All LE features', 'SofTex seats', 'Heated seats', '9.0" touchscreen', 'JBL audio'] },
  ],
  'Toyota RAV4 Hybrid': [
    { id: 'le', name: 'LE', price: '$32,825', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Toyota Safety Sense 2.5+', 'AWD', 'LED headlights'] },
    { id: 'xle', name: 'XLE', price: '$35,625', recommended: true, features: ['All LE features', 'Blind spot monitor', 'Power liftgate', 'Roof rails', 'Digital rearview mirror'] },
    { id: 'xle-premium', name: 'XLE Premium', price: '$38,625', features: ['All XLE features', 'Moonroof', 'Heated seats', 'SofTex seats', 'Wireless charging'] },
    { id: 'se', name: 'SE', price: '$39,625', features: ['All XLE features', 'Sport suspension', '19" wheels', 'Sport styling', 'Paddle shifters'] },
    { id: 'xse', name: 'XSE', price: '$40,030', features: ['All SE features', 'Two-tone roof', 'JBL audio', '9.0" touchscreen', 'Premium interior'] },
  ],
  'Toyota Highlander': [
    { id: 'l', name: 'L', price: '$39,420', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Toyota Safety Sense 2.5+', 'LED headlights', '8 passenger'] },
    { id: 'le', name: 'LE', price: '$42,020', features: ['All L features', 'Power liftgate', 'Roof rails', 'Blind spot monitor', 'Tri-zone climate'] },
    { id: 'xle', name: 'XLE', price: '$46,225', recommended: true, features: ['All LE features', 'SofTex seats', 'Heated seats', 'Moonroof', 'Navigation'] },
    { id: 'limited', name: 'Limited', price: '$50,725', features: ['All XLE features', 'Leather seats', 'Ventilated seats', 'JBL audio', 'Digital rearview mirror'] },
    { id: 'platinum', name: 'Platinum', price: '$53,325', features: ['All Limited features', 'Panoramic roof', 'Head-up display', '12.3" touchscreen', 'Premium interior'] },
  ],
  'Toyota Tacoma': [
    { id: 'sr', name: 'SR', price: '$31,500', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Toyota Safety Sense 2.5', 'LED headlights', 'Composite bed'] },
    { id: 'sr5', name: 'SR5', price: '$34,640', recommended: true, features: ['All SR features', 'Chrome grille', 'Keyless entry', 'Power windows', 'Upgraded interior'] },
    { id: 'trd-sport', name: 'TRD Sport', price: '$39,200', features: ['All SR5 features', 'Sport suspension', '17" wheels', 'Hood scoop', 'Sport styling'] },
    { id: 'trd-off-road', name: 'TRD Off-Road', price: '$40,925', features: ['All SR5 features', 'Off-road suspension', 'Crawl Control', 'Multi-terrain select', 'Locking rear diff'] },
    { id: 'limited', name: 'Limited', price: '$47,405', features: ['All SR5 features', 'Leather seats', 'JBL audio', 'Moonroof', 'Premium interior'] },
    { id: 'trd-pro', name: 'TRD Pro', price: '$54,920', features: ['All TRD Off-Road features', 'FOX shocks', 'Skid plate', 'TRD exhaust', 'Heritage colors'] },
  ],
  'Toyota Tundra': [
    { id: 'sr', name: 'SR', price: '$39,965', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'i-Force Twin Turbo V6', 'LED headlights', 'Composite bed'] },
    { id: 'sr5', name: 'SR5', price: '$43,465', recommended: true, features: ['All SR features', 'Chrome bumpers', 'Power seats', 'Remote start', 'Trailer brake controller'] },
    { id: 'limited', name: 'Limited', price: '$53,465', features: ['All SR5 features', 'Leather seats', 'Heated/ventilated seats', 'JBL audio', 'Moonroof'] },
    { id: 'platinum', name: 'Platinum', price: '$59,065', features: ['All Limited features', 'Adaptive suspension', 'Panoramic view', 'Head-up display', '14.0" touchscreen'] },
    { id: 'trd-pro', name: 'TRD Pro', price: '$66,665', features: ['All Limited features', 'FOX shocks', 'TRD exhaust', 'Skid plates', 'Heritage-inspired colors'] },
    { id: '1794', name: '1794 Edition', price: '$61,365', features: ['All Platinum features', 'Saddle Brown interior', 'Premium leather', 'Western-inspired styling', 'Exclusive trim'] },
  ],
  'Toyota Prius': [
    { id: 'le', name: 'LE', price: '$28,545', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Toyota Safety Sense 3.0', 'LED headlights', 'Auto climate'] },
    { id: 'xle', name: 'XLE', price: '$31,990', recommended: true, features: ['All LE features', 'SofTex seats', 'Heated seats', 'Moonroof', 'Wireless charging'] },
    { id: 'limited', name: 'Limited', price: '$35,560', features: ['All XLE features', 'Leather seats', 'JBL audio', 'Head-up display', 'Digital key'] },
    { id: 'prime-se', name: 'Prime SE', price: '$33,445', features: ['Plug-in hybrid', '44-mile EV range', 'All LE features', 'Quick charge port', 'EV mode'] },
    { id: 'prime-xse', name: 'Prime XSE', price: '$40,090', features: ['All Prime SE features', 'Premium interior', 'Larger touchscreen', 'Solar roof available', 'Premium audio'] },
  ],

  // ============== HYUNDAI ==============
  'Hyundai Kona': [
    { id: 'se', name: 'SE', price: '$25,175', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Forward collision avoidance', 'Lane keeping assist', 'LED headlights'] },
    { id: 'sel', name: 'SEL', price: '$27,175', recommended: true, features: ['All SE features', 'Blind spot monitor', 'Rear cross traffic', '12.3" touchscreen', 'Wireless charging'] },
    { id: 'limited', name: 'Limited', price: '$32,475', features: ['All SEL features', 'Leather seats', 'Heated/ventilated seats', 'Bose audio', 'Head-up display'] },
    { id: 'n-line', name: 'N Line', price: '$30,175', features: ['All SEL features', 'Sport suspension', 'N Line styling', 'Sport exhaust', '19" wheels'] },
  ],
  'Hyundai Venue': [
    { id: 'se', name: 'SE', price: '$20,875', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Forward collision avoidance', 'Lane keeping assist', 'Rear camera'] },
    { id: 'sel', name: 'SEL', price: '$22,375', recommended: true, features: ['All SE features', 'Blind spot monitor', 'Rear cross traffic', 'LED headlights', 'Sunroof'] },
    { id: 'limited', name: 'Limited', price: '$24,775', features: ['All SEL features', 'Leather seats', 'Wireless charging', 'Bose audio', 'LED tail lights'] },
  ],
  'Hyundai Elantra': [
    { id: 'se', name: 'SE', price: '$22,865', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Forward collision avoidance', 'Lane keeping assist', 'LED headlights'] },
    { id: 'sel', name: 'SEL', price: '$24,365', recommended: true, features: ['All SE features', '10.25" touchscreen', 'Blind spot monitor', 'Remote start', 'Heated seats'] },
    { id: 'limited', name: 'Limited', price: '$28,865', features: ['All SEL features', 'Leather seats', 'Bose audio', 'Ventilated seats', 'Sunroof'] },
    { id: 'n-line', name: 'N Line', price: '$27,565', features: ['All SEL features', '201hp Turbo', 'Sport suspension', 'N Line styling', 'Dual exhaust'] },
    { id: 'n', name: 'N', price: '$34,565', features: ['276hp Turbo', '6-speed manual', 'N Track mode', 'Performance brakes', 'Limited-slip diff'] },
  ],
  'Hyundai Sonata': [
    { id: 'se', name: 'SE', price: '$28,550', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Smart Safety Suite', 'LED headlights', 'Auto climate'] },
    { id: 'sel', name: 'SEL', price: '$30,150', recommended: true, features: ['All SE features', '10.25" touchscreen', 'Heated seats', 'Remote start', 'Wireless charging'] },
    { id: 'sel-plus', name: 'SEL Plus', price: '$32,650', features: ['All SEL features', 'Panoramic sunroof', 'Bose audio', 'Ventilated seats', 'Digital key'] },
    { id: 'limited', name: 'Limited', price: '$35,900', features: ['All SEL Plus features', 'Leather seats', 'HDA II', 'Parking assist', 'Premium audio'] },
    { id: 'n-line', name: 'N Line', price: '$35,400', features: ['All SEL features', '290hp Turbo', 'Sport suspension', 'N Line styling', 'Dual exhaust'] },
  ],
  'Hyundai Santa Fe': [
    { id: 'se', name: 'SE', price: '$35,875', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Smart Safety Suite', 'LED headlights', 'AWD available'] },
    { id: 'sel', name: 'SEL', price: '$38,775', recommended: true, features: ['All SE features', '12.3" touchscreen', 'Heated seats', 'Remote start', 'Power liftgate'] },
    { id: 'xrt', name: 'XRT', price: '$41,275', features: ['All SEL features', 'XRT styling', 'All-terrain tires', 'Roof rails', 'Increased ride height'] },
    { id: 'limited', name: 'Limited', price: '$44,775', features: ['All SEL features', 'Leather seats', 'Ventilated seats', 'Bose audio', 'Panoramic sunroof'] },
    { id: 'calligraphy', name: 'Calligraphy', price: '$48,475', features: ['All Limited features', 'Nappa leather', '20" wheels', 'Surround view', 'Head-up display'] },
  ],
  'Hyundai Ioniq 5': [
    { id: 'se-standard', name: 'SE Standard', price: '$42,785', features: ['12.3" dual displays', 'Apple CarPlay/Android Auto', 'V2L capability', 'Fast charging', 'Highway Driving Assist'] },
    { id: 'se-long', name: 'SE Long Range', price: '$47,785', features: ['All SE features', '303-mile range', 'All-digital cluster', 'Power liftgate', 'Relaxation seats'] },
    { id: 'sel', name: 'SEL', price: '$50,785', recommended: true, features: ['All SE Long features', 'Vision Roof', 'Bose audio', 'Heated/ventilated seats', 'Remote Smart Parking'] },
    { id: 'limited', name: 'Limited', price: '$56,785', features: ['All SEL features', 'AWD', 'Heads-up display', 'Suede headliner', 'Premium Relaxation seats'] },
  ],
  'Hyundai Ioniq 6': [
    { id: 'se-standard', name: 'SE Standard', price: '$42,450', features: ['12.3" dual displays', 'Apple CarPlay/Android Auto', 'Highway Driving Assist II', 'Fast charging', 'V2L'] },
    { id: 'se-long', name: 'SE Long Range', price: '$47,450', features: ['All SE features', '361-mile range', 'Power seats', 'Wireless charging', 'Digital key 2.0'] },
    { id: 'sel', name: 'SEL', price: '$50,950', recommended: true, features: ['All SE Long features', 'Vision Roof', 'Bose audio', 'Heated/ventilated seats', 'Ambient lighting'] },
    { id: 'limited', name: 'Limited', price: '$55,950', features: ['All SEL features', 'AWD', 'Heads-up display', 'Relaxation seats', 'Premium audio'] },
  ],

  // ============== KIA ==============
  'Kia Seltos': [
    { id: 'lx', name: 'LX', price: '$24,590', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Forward collision avoidance', 'Lane keeping assist', 'Rear camera'] },
    { id: 's', name: 'S', price: '$26,090', features: ['All LX features', 'Blind spot monitor', '10.25" touchscreen', 'Wireless charging', 'Roof rails'] },
    { id: 'ex', name: 'EX', price: '$28,590', recommended: true, features: ['All S features', 'Leather seats', 'Heated seats', 'Sunroof', 'Harman Kardon audio'] },
    { id: 'sx-turbo', name: 'SX Turbo', price: '$30,590', features: ['All EX features', '1.6L Turbo', 'Ventilated seats', 'Head-up display', 'Power liftgate'] },
  ],
  'Kia Sportage Hybrid': [
    { id: 'lx', name: 'LX', price: '$32,290', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Drive Wise safety', 'LED headlights', 'AWD'] },
    { id: 'ex', name: 'EX', price: '$35,290', recommended: true, features: ['All LX features', '12.3" curved display', 'Heated seats', 'Power liftgate', 'Remote start'] },
    { id: 'sx-prestige', name: 'SX-Prestige', price: '$40,290', features: ['All EX features', 'Leather seats', 'Ventilated seats', 'Bose audio', 'Sunroof'] },
    { id: 'x-line', name: 'X-Line', price: '$42,290', features: ['All SX features', 'AWD', 'Off-road styling', 'Increased clearance', 'X-Line exterior'] },
  ],
  'Kia Forte': [
    { id: 'fe', name: 'FE', price: '$20,815', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Forward collision avoidance', 'Lane keeping assist', 'Rear camera'] },
    { id: 'lxs', name: 'LXS', price: '$22,015', features: ['All FE features', 'Blind spot monitor', 'LED headlights', 'Power mirrors', 'Alloy wheels'] },
    { id: 'gt-line', name: 'GT-Line', price: '$24,515', recommended: true, features: ['All LXS features', 'Sport styling', '10.25" touchscreen', 'Wireless charging', 'Sport seats'] },
    { id: 'gt', name: 'GT', price: '$25,515', features: ['201hp Turbo', 'Sport suspension', 'Performance brakes', 'Dual exhaust', 'Launch control'] },
  ],
  'Kia K5': [
    { id: 'lxs', name: 'LXS', price: '$26,890', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Drive Wise safety', 'LED headlights', 'Rear camera'] },
    { id: 'gt-line', name: 'GT-Line', price: '$29,090', recommended: true, features: ['All LXS features', '10.25" touchscreen', 'Sport styling', 'Dual exhaust tips', 'Premium interior'] },
    { id: 'ex', name: 'EX', price: '$30,190', features: ['All GT-Line features', 'Leather seats', 'Heated/ventilated seats', 'Bose audio', 'Power sunroof'] },
    { id: 'gt', name: 'GT', price: '$34,090', features: ['290hp Turbo', 'Sport suspension', '19" wheels', 'Sport mode', 'Launch control'] },
  ],
  'Kia Telluride': [
    { id: 'lx', name: 'LX', price: '$37,490', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Drive Wise safety', 'LED headlights', '8 passenger'] },
    { id: 's', name: 'S', price: '$39,890', features: ['All LX features', 'Heated seats', 'Remote start', 'Power liftgate', 'Second-row sunshades'] },
    { id: 'ex', name: 'EX', price: '$43,590', recommended: true, features: ['All S features', 'Leather seats', 'Heated/ventilated seats', 'Harman Kardon audio', 'Sunroof'] },
    { id: 'sx', name: 'SX', price: '$47,190', features: ['All EX features', '20" wheels', 'Premium Nappa leather', 'Heads-up display', 'Surround view'] },
    { id: 'x-pro', name: 'X-Pro', price: '$49,590', features: ['All EX features', 'AWD', 'All-terrain tires', 'X-Pro styling', 'Tow-rated suspension'] },
    { id: 'sx-prestige', name: 'SX-Prestige', price: '$52,790', features: ['All SX features', 'Dual sunroof', 'Rear seat entertainment', 'Premium audio', 'Captain\'s chairs'] },
  ],
  'Kia Soul': [
    { id: 'lx', name: 'LX', price: '$20,890', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Forward collision avoidance', 'Lane keeping assist', 'Rear camera'] },
    { id: 's', name: 'S', price: '$22,990', features: ['All LX features', 'UVO connected services', 'LED headlights', 'Alloy wheels', 'Privacy glass'] },
    { id: 'ex', name: 'EX', price: '$24,990', recommended: true, features: ['All S features', '10.25" touchscreen', 'Heated seats', 'Wireless charging', 'Smart key'] },
    { id: 'gt-line', name: 'GT-Line', price: '$27,990', features: ['All EX features', 'Sport styling', 'Sunroof', 'Harman Kardon audio', 'Sport mode'] },
  ],
  'Kia EV6': [
    { id: 'light-rwd', name: 'Light RWD', price: '$43,975', features: ['12.3" dual displays', 'Apple CarPlay/Android Auto', 'Drive Wise safety', 'V2L capability', '232-mile range'] },
    { id: 'wind-rwd', name: 'Wind RWD', price: '$49,975', features: ['All Light features', '310-mile range', 'Heated seats', 'Remote Smart Parking', 'Vision roof'] },
    { id: 'wind-awd', name: 'Wind AWD', price: '$53,975', recommended: true, features: ['All Wind RWD features', 'AWD', 'Harman Kardon audio', 'Ventilated seats', 'Power memory seats'] },
    { id: 'gt-line-awd', name: 'GT-Line AWD', price: '$57,975', features: ['All Wind AWD features', 'GT-Line styling', 'Suede headliner', 'Relaxation seats', 'Head-up display'] },
    { id: 'gt', name: 'GT', price: '$64,975', features: ['576hp dual motor', 'Drift mode', 'Electronic LSD', 'GT Mode', '0-60 in 3.4 seconds'] },
  ],

  // ============== FORD ==============
  'Ford F-150': [
    { id: 'xl', name: 'XL', price: '$36,495', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Ford Co-Pilot360', 'Pro Trailer Backup', 'LED headlights'] },
    { id: 'xlt', name: 'XLT', price: '$44,970', recommended: true, features: ['All XL features', '12.0" touchscreen', 'SYNC 4', 'Power tailgate', 'Remote start'] },
    { id: 'lariat', name: 'Lariat', price: '$54,070', features: ['All XLT features', 'Leather seats', 'Heated/ventilated seats', 'B&O audio', 'Power running boards'] },
    { id: 'king-ranch', name: 'King Ranch', price: '$65,745', features: ['All Lariat features', 'King Ranch styling', 'Multicontour seats', 'Trailer Tow package', 'Premium leather'] },
    { id: 'platinum', name: 'Platinum', price: '$67,915', features: ['All Lariat features', 'Platinum styling', 'Massage seats', 'Tech Package', 'Power deploy running boards'] },
    { id: 'tremor', name: 'Tremor', price: '$59,260', features: ['All XLT features', 'Off-road suspension', 'Tremor styling', 'Rock crawl mode', 'Trail Control'] },
    { id: 'raptor', name: 'Raptor', price: '$78,010', features: ['450hp 3.5L EcoBoost', 'FOX shocks', 'Terrain Management', 'Raptor styling', 'Beadlock wheels'] },
  ],
  'Ford Maverick': [
    { id: 'xl', name: 'XL', price: '$24,995', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Ford Co-Pilot360', 'Hybrid powertrain', '42 mpg city'] },
    { id: 'xlt', name: 'XLT', price: '$27,560', recommended: true, features: ['All XL features', 'SYNC 3', 'Cruise control', 'Power mirrors', 'Alloy wheels'] },
    { id: 'lariat', name: 'Lariat', price: '$31,565', features: ['All XLT features', 'Heated seats', 'Wireless charging', 'B&O audio', '8-way power seat'] },
    { id: 'tremor', name: 'Tremor', price: '$35,870', features: ['All XLT features', '2.0L EcoBoost', 'AWD', 'Off-road tires', 'Trail Control'] },
  ],
  'Ford Ranger': [
    { id: 'xl', name: 'XL', price: '$33,835', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Ford Co-Pilot360', 'LED headlights', 'Trailer sway control'] },
    { id: 'xlt', name: 'XLT', price: '$36,835', recommended: true, features: ['All XL features', 'SYNC 4', 'Remote start', 'Dual-zone climate', 'Power tailgate'] },
    { id: 'lariat', name: 'Lariat', price: '$44,395', features: ['All XLT features', 'Leather seats', 'Heated/ventilated seats', 'B&O audio', 'Adaptive cruise'] },
    { id: 'raptor', name: 'Raptor', price: '$57,895', features: ['405hp 3.0L V6', 'FOX shocks', 'Terrain Management', 'Beadlock wheels', 'Off-road graphics'] },
  ],
  'Ford Mustang': [
    { id: 'ecoboost', name: 'EcoBoost', price: '$32,515', features: ['2.3L EcoBoost', '315hp', '12.4" digital cluster', 'SYNC 4', 'Track Apps'] },
    { id: 'ecoboost-premium', name: 'EcoBoost Premium', price: '$39,015', recommended: true, features: ['All EcoBoost features', 'Leather seats', 'B&O audio', 'Digital dash', 'Active exhaust'] },
    { id: 'gt', name: 'GT', price: '$43,315', features: ['5.0L V8 486hp', 'Performance brakes', 'Launch control', 'Line-lock', 'Track Apps'] },
    { id: 'gt-premium', name: 'GT Premium', price: '$49,815', features: ['All GT features', 'Leather seats', 'B&O audio', 'MagneRide damping', 'Recaro seats available'] },
    { id: 'dark-horse', name: 'Dark Horse', price: '$60,775', features: ['5.0L V8 500hp', 'Track-focused suspension', 'Torsen diff', 'Brembo brakes', 'Unique styling'] },
  ],
  'Ford Mustang Mach-E': [
    { id: 'select-rwd', name: 'Select RWD', price: '$42,995', features: ['15.5" touchscreen', 'Ford Co-Pilot360', 'FordPass Connect', 'LED headlights', '250-mile range'] },
    { id: 'premium-rwd', name: 'Premium RWD', price: '$47,995', features: ['All Select features', 'B&O audio', 'Heated/ventilated seats', 'Panoramic roof', 'Extended range'] },
    { id: 'premium-awd', name: 'Premium AWD', price: '$51,995', recommended: true, features: ['All Premium RWD features', 'AWD', '346hp', 'One-pedal driving', 'Phone as key'] },
    { id: 'gt', name: 'GT', price: '$63,995', features: ['All Premium AWD features', '480hp', 'MagneRide damping', 'GT styling', '3.5s 0-60'] },
    { id: 'gt-performance', name: 'GT Performance', price: '$69,995', features: ['All GT features', '480hp enhanced', 'Brembo brakes', 'Performance tires', 'Track mode'] },
  ],
  'Ford Expedition': [
    { id: 'xlt', name: 'XLT', price: '$58,750', features: ['12.0" touchscreen', 'SYNC 4', 'Ford Co-Pilot360 2.0', 'Tri-zone climate', '8 passenger'] },
    { id: 'limited', name: 'Limited', price: '$71,715', recommended: true, features: ['All XLT features', 'Leather seats', 'Heated/ventilated seats', 'B&O audio', 'Power running boards'] },
    { id: 'timberline', name: 'Timberline', price: '$74,775', features: ['All Limited features', 'Off-road suspension', 'Skid plates', 'Trail Turn Assist', 'All-terrain tires'] },
    { id: 'platinum', name: 'Platinum', price: '$80,090', features: ['All Limited features', 'Massage seats', 'Panoramic roof', 'Extended leather', '22" wheels'] },
    { id: 'king-ranch', name: 'King Ranch', price: '$80,865', features: ['All Limited features', 'King Ranch styling', 'Del Rio leather', 'Running W accents', 'Mesa Brown interior'] },
  ],

  // ============== NISSAN ==============
  'Nissan Kicks': [
    { id: 's', name: 'S', price: '$22,340', features: ['7.0" touchscreen', 'Apple CarPlay/Android Auto', 'Safety Shield 360', 'LED headlights', 'Rear camera'] },
    { id: 'sv', name: 'SV', price: '$24,120', recommended: true, features: ['All S features', '8.0" touchscreen', 'Remote start', 'Push-button start', 'Privacy glass'] },
    { id: 'sr', name: 'SR', price: '$25,930', features: ['All SV features', 'Sport styling', '17" wheels', 'Bose audio', 'Prima-Tex seats'] },
  ],
  'Nissan Sentra': [
    { id: 's', name: 'S', price: '$21,930', features: ['7.0" touchscreen', 'Apple CarPlay/Android Auto', 'Safety Shield 360', 'LED headlights', 'Auto headlights'] },
    { id: 'sv', name: 'SV', price: '$23,610', recommended: true, features: ['All S features', '8.0" touchscreen', 'Remote start', 'Blind spot warning', 'Rear cross traffic alert'] },
    { id: 'sr', name: 'SR', price: '$25,310', features: ['All SV features', 'Sport styling', '18" wheels', 'Bose audio', 'Sport seats'] },
  ],
  'Nissan Altima': [
    { id: 's', name: 'S', price: '$27,140', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Safety Shield 360', 'LED headlights', 'Dual-zone climate'] },
    { id: 'sv', name: 'SV', price: '$29,520', recommended: true, features: ['All S features', 'Power driver seat', 'Remote start', 'ProPILOT Assist', 'Heated seats'] },
    { id: 'sr', name: 'SR', price: '$31,520', features: ['All SV features', 'Sport styling', '19" wheels', 'Bose audio', 'Sport suspension'] },
    { id: 'sl', name: 'SL', price: '$34,620', features: ['All SV features', 'Leather seats', 'Moonroof', 'Bose audio', 'Memory seats'] },
    { id: 'platinum', name: 'Platinum', price: '$36,620', features: ['All SL features', 'Quilted leather', 'ProPILOT Assist', 'Heads-up display', 'Surround view'] },
  ],
  'Nissan Pathfinder': [
    { id: 's', name: 'S', price: '$37,080', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'Safety Shield 360', 'LED headlights', 'Tri-zone climate'] },
    { id: 'sv', name: 'SV', price: '$40,280', recommended: true, features: ['All S features', '9.0" touchscreen', 'Heated seats', 'Remote start', 'Power liftgate'] },
    { id: 'sl', name: 'SL', price: '$45,780', features: ['All SV features', 'Leather seats', 'Bose audio', 'Moonroof', 'Memory seats'] },
    { id: 'platinum', name: 'Platinum', price: '$50,850', features: ['All SL features', 'Quilted leather', 'Heads-up display', 'Massaging seats', '20" wheels'] },
    { id: 'rock-creek', name: 'Rock Creek', price: '$44,280', features: ['All SV features', 'AWD', 'Off-road styling', 'All-terrain tires', 'Tubular roof rack'] },
  ],
  'Nissan Armada': [
    { id: 'sv', name: 'SV', price: '$55,750', features: ['12.3" touchscreen', 'Apple CarPlay/Android Auto', 'Safety Shield 360', '8 passenger', 'LED headlights'] },
    { id: 'sl', name: 'SL', price: '$59,850', recommended: true, features: ['All SV features', 'Leather seats', 'Bose audio', 'Moonroof', 'Remote start'] },
    { id: 'platinum', name: 'Platinum', price: '$68,750', features: ['All SL features', 'Quilted leather', 'Captain\'s chairs', 'Heads-up display', '22" wheels'] },
    { id: 'midnight', name: 'Midnight Edition', price: '$62,250', features: ['All SL features', 'Blacked-out styling', '20" black wheels', 'Dark chrome accents', 'Special badging'] },
  ],

  // ============== SUBARU ==============
  'Subaru Crosstrek': [
    { id: 'base', name: 'Base', price: '$26,290', features: ['7.0" touchscreen', 'Apple CarPlay/Android Auto', 'EyeSight Driver Assist', 'AWD', 'X-Mode'] },
    { id: 'premium', name: 'Premium', price: '$28,190', recommended: true, features: ['All Base features', '11.6" touchscreen', 'Heated seats', 'Remote start', 'Moonroof'] },
    { id: 'sport', name: 'Sport', price: '$30,690', features: ['All Premium features', '182hp', 'Sport mesh grille', 'Yellow accents', 'Sport seats'] },
    { id: 'limited', name: 'Limited', price: '$32,690', features: ['All Premium features', 'Leather seats', 'Harman Kardon audio', 'Power liftgate', 'Blind spot monitor'] },
    { id: 'wilderness', name: 'Wilderness', price: '$33,290', features: ['All Sport features', 'Raised suspension', 'All-terrain tires', 'Dual X-Mode', 'Skid plates'] },
  ],
  'Subaru Forester': [
    { id: 'base', name: 'Base', price: '$33,695', features: ['7.0" touchscreen', 'Apple CarPlay/Android Auto', 'EyeSight Driver Assist', 'AWD', 'X-Mode'] },
    { id: 'premium', name: 'Premium', price: '$36,295', recommended: true, features: ['All Base features', '11.6" touchscreen', 'Heated seats', 'Power liftgate', 'Remote start'] },
    { id: 'sport', name: 'Sport', price: '$38,995', features: ['All Premium features', 'Sport mesh grille', 'Orange accents', 'Sport seats', 'Moonroof'] },
    { id: 'limited', name: 'Limited', price: '$40,095', features: ['All Premium features', 'Leather seats', 'Harman Kardon audio', 'Navigation', 'DriverFocus'] },
    { id: 'touring', name: 'Touring', price: '$42,495', features: ['All Limited features', 'Nappa leather', 'Ventilated seats', 'Panoramic roof', 'Premium audio'] },
    { id: 'wilderness', name: 'Wilderness', price: '$40,695', features: ['All Sport features', 'Raised suspension', 'All-terrain tires', 'Dual X-Mode', 'Copper accents'] },
  ],
  'Subaru Outback': [
    { id: 'base', name: 'Base', price: '$32,395', features: ['11.6" touchscreen', 'Apple CarPlay/Android Auto', 'EyeSight Driver Assist', 'AWD', 'X-Mode'] },
    { id: 'premium', name: 'Premium', price: '$35,395', recommended: true, features: ['All Base features', 'Heated seats', 'Power liftgate', 'Remote start', 'LED fog lights'] },
    { id: 'onyx-edition', name: 'Onyx Edition XT', price: '$40,595', features: ['260hp Turbo', 'Black accents', 'StarTex seats', 'Full-size spare', 'Dual X-Mode'] },
    { id: 'limited', name: 'Limited', price: '$39,895', features: ['All Premium features', 'Leather seats', 'Harman Kardon audio', 'Ventilated seats', 'Power seats'] },
    { id: 'touring', name: 'Touring', price: '$42,695', features: ['All Limited features', 'Nappa leather', 'Navigation', 'Head-up display', 'Premium audio'] },
    { id: 'wilderness', name: 'Wilderness', price: '$41,895', features: ['260hp Turbo', 'Raised suspension', 'All-terrain tires', 'Ladder roof rack', 'Dual X-Mode'] },
  ],
  'Subaru Ascent': [
    { id: 'base', name: 'Base', price: '$37,895', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'EyeSight Driver Assist', 'AWD', '8 passenger'] },
    { id: 'premium', name: 'Premium', price: '$41,395', recommended: true, features: ['All Base features', '11.6" touchscreen', 'Heated seats', 'Remote start', 'Power liftgate'] },
    { id: 'onyx', name: 'Onyx Edition', price: '$44,595', features: ['All Premium features', 'Black accents', 'StarTex seats', 'Captain\'s chairs', 'Roof rails'] },
    { id: 'limited', name: 'Limited', price: '$46,395', features: ['All Premium features', 'Leather seats', 'Harman Kardon audio', 'Ventilated seats', 'Moonroof'] },
    { id: 'touring', name: 'Touring', price: '$50,695', features: ['All Limited features', 'Nappa leather', 'Panoramic roof', 'Navigation', 'Captain\'s chairs'] },
  ],

  // ============== MAZDA ==============
  'Mazda 3': [
    { id: '2.5-s', name: '2.5 S', price: '$24,970', features: ['8.8" display', 'Apple CarPlay/Android Auto', 'i-Activsense safety', 'LED headlights', 'Mazda Connect'] },
    { id: '2.5-s-select', name: '2.5 S Select', price: '$26,550', features: ['All S features', 'Leatherette seats', 'Power driver seat', 'Blind spot monitor', 'Rear cross traffic'] },
    { id: '2.5-s-preferred', name: '2.5 S Preferred', price: '$28,100', recommended: true, features: ['All Select features', 'Leather seats', 'Heated seats', 'Bose audio', 'Power moonroof'] },
    { id: '2.5-s-carbon', name: '2.5 S Carbon Edition', price: '$30,200', features: ['All Preferred features', 'Polymetal Gray', 'Red leather', 'Black wheels', 'Exclusive styling'] },
    { id: '2.5-turbo', name: '2.5 Turbo', price: '$33,150', features: ['250hp Turbo', 'AWD', 'All Preferred features', 'Sport-tuned suspension', 'Paddle shifters'] },
    { id: '2.5-turbo-premium', name: '2.5 Turbo Premium Plus', price: '$36,150', features: ['All Turbo features', 'Leather seats', 'Heads-up display', 'Traffic Jam Assist', 'Surround view'] },
  ],
  'Mazda CX-5': [
    { id: '2.5-s', name: '2.5 S', price: '$29,300', features: ['10.25" display', 'Apple CarPlay/Android Auto', 'i-Activsense safety', 'LED headlights', 'Smart City Brake'] },
    { id: '2.5-s-select', name: '2.5 S Select', price: '$31,250', features: ['All S features', 'Leatherette seats', 'Power driver seat', 'Blind spot monitor', 'Power liftgate'] },
    { id: '2.5-s-preferred', name: '2.5 S Preferred', price: '$33,350', recommended: true, features: ['All Select features', 'Leather seats', 'Heated seats', 'Bose audio', 'Power moonroof'] },
    { id: '2.5-s-carbon', name: '2.5 S Carbon Edition', price: '$35,100', features: ['All Preferred features', 'Polymetal Gray', 'Red leather', 'Black wheels', 'Exclusive trim'] },
    { id: '2.5-turbo', name: '2.5 Turbo', price: '$38,000', features: ['256hp Turbo', 'AWD', 'All Preferred features', 'Sport-tuned suspension', 'Paddle shifters'] },
    { id: '2.5-turbo-signature', name: '2.5 Turbo Signature', price: '$41,150', features: ['All Turbo features', 'Nappa leather', 'Caturra wood trim', 'Ventilated seats', 'Heads-up display'] },
  ],
  'Mazda CX-90': [
    { id: '3.3-turbo', name: '3.3 Turbo', price: '$40,970', features: ['12.3" display', 'Apple CarPlay/Android Auto', 'i-Activsense safety', 'AWD', '8 passenger'] },
    { id: '3.3-turbo-preferred', name: '3.3 Turbo Preferred', price: '$44,770', features: ['All Turbo features', 'Leather seats', 'Heated seats', 'Power liftgate', 'Bose audio'] },
    { id: '3.3-turbo-premium', name: '3.3 Turbo Premium', price: '$48,070', recommended: true, features: ['All Preferred features', 'Ventilated seats', 'Panoramic moonroof', 'Wireless charging', 'Traffic Jam Assist'] },
    { id: '3.3-turbo-s', name: '3.3 Turbo S', price: '$50,520', features: ['340hp', 'Kinematic Posture Control', 'All Premium features', 'Sport-tuned suspension', 'Paddle shifters'] },
    { id: 'phev', name: 'PHEV Premium Plus', price: '$52,070', features: ['Plug-in hybrid', '26-mile EV range', 'All Premium features', 'Quick charge port', 'Regenerative braking'] },
  ],
  'Mazda MX-5 Miata': [
    { id: 'sport', name: 'Sport', price: '$28,885', features: ['7.0" display', 'Apple CarPlay/Android Auto', 'Blind spot monitor', 'LED headlights', '6-speed manual'] },
    { id: 'club', name: 'Club', price: '$33,245', recommended: true, features: ['All Sport features', 'Limited-slip diff', 'Bilstein dampers', 'BBS wheels', 'Brembo brakes'] },
    { id: 'grand-touring', name: 'Grand Touring', price: '$36,485', features: ['All Sport features', 'Leather seats', 'Heated seats', 'Bose audio', 'Navigation'] },
  ],

  // ============== BMW ==============
  'BMW 3 Series': [
    { id: '330i', name: '330i', price: '$46,200', features: ['8.8" display', 'Apple CarPlay', 'BMW Safety features', 'LED headlights', 'Sport seats'] },
    { id: '330i-xdrive', name: '330i xDrive', price: '$48,200', recommended: true, features: ['All 330i features', 'xDrive AWD', 'Heated seats', 'Remote start', 'Park assist'] },
    { id: 'm340i', name: 'M340i', price: '$58,200', features: ['382hp B58 I6', 'M Sport brakes', 'Adaptive suspension', 'M Sport styling', 'Track mode'] },
    { id: 'm340i-xdrive', name: 'M340i xDrive', price: '$60,200', features: ['All M340i features', 'xDrive AWD', 'M Sport diff', 'Launch control', 'Enhanced exhaust'] },
  ],
  'BMW 5 Series': [
    { id: '530i', name: '530i', price: '$58,200', features: ['12.3" curved display', 'Apple CarPlay', 'BMW Safety features', 'LED headlights', 'Leather seats'] },
    { id: '530i-xdrive', name: '530i xDrive', price: '$60,700', recommended: true, features: ['All 530i features', 'xDrive AWD', 'Heated seats', 'Parking Assistant', 'Gesture control'] },
    { id: '540i-xdrive', name: '540i xDrive', price: '$66,000', features: ['335hp B58 I6', 'All 530i xDrive features', 'M Sport brakes', 'Adaptive suspension', 'Sport exhaust'] },
    { id: 'm550i', name: 'M550i xDrive', price: '$78,000', features: ['523hp V8', 'M Sport diff', 'Adaptive M suspension', 'M Sport brakes', 'Launch control'] },
  ],
  'BMW X5': [
    { id: 'sdrive40i', name: 'sDrive40i', price: '$66,400', features: ['12.3" dual displays', 'Apple CarPlay', 'BMW Safety features', 'Panoramic roof', 'Power liftgate'] },
    { id: 'xdrive40i', name: 'xDrive40i', price: '$68,900', recommended: true, features: ['All sDrive40i features', 'xDrive AWD', 'Air suspension', 'Off-road modes', 'Trailer assist'] },
    { id: 'xdrive50e', name: 'xDrive50e', price: '$74,900', features: ['Plug-in hybrid', '389hp', '30-mile EV range', 'All xDrive40i features', 'Regenerative braking'] },
    { id: 'm60i', name: 'M60i xDrive', price: '$90,400', features: ['523hp V8', 'M Sport diff', 'Adaptive M suspension', 'M Sport brakes', 'Launch control'] },
  ],

  // ============== MERCEDES-BENZ ==============
  'Mercedes-Benz C-Class': [
    { id: 'c300', name: 'C 300', price: '$48,100', features: ['11.9" touchscreen', 'Apple CarPlay', 'Active brake assist', 'LED headlights', 'MBUX infotainment'] },
    { id: 'c300-4matic', name: 'C 300 4MATIC', price: '$50,100', recommended: true, features: ['All C 300 features', '4MATIC AWD', 'Heated seats', 'Ambient lighting', 'Burmester audio'] },
    { id: 'amg-c43', name: 'AMG C 43', price: '$60,600', features: ['402hp Turbo I4', 'AMG suspension', 'AMG styling', 'Performance exhaust', 'AMG seats'] },
    { id: 'amg-c63', name: 'AMG C 63 S E Performance', price: '$85,900', features: ['671hp Hybrid', 'AMG Performance', 'Carbon fiber', 'Track mode', 'Drift mode'] },
  ],
  'Mercedes-Benz GLE': [
    { id: 'gle350', name: 'GLE 350', price: '$62,750', features: ['12.3" dual displays', 'Apple CarPlay', 'Active brake assist', 'LED headlights', 'MBUX'] },
    { id: 'gle350-4matic', name: 'GLE 350 4MATIC', price: '$65,250', recommended: true, features: ['All GLE 350 features', '4MATIC AWD', 'Air suspension', 'Power liftgate', 'Burmester audio'] },
    { id: 'gle450-4matic', name: 'GLE 450 4MATIC', price: '$72,250', features: ['362hp mild hybrid', 'All GLE 350 4MATIC features', 'E-Active Body Control', 'Sport exhaust', '21" wheels'] },
    { id: 'amg-gle53', name: 'AMG GLE 53', price: '$82,550', features: ['429hp I6', 'AMG suspension', 'AMG styling', 'Performance exhaust', 'AMG seats'] },
    { id: 'amg-gle63s', name: 'AMG GLE 63 S', price: '$122,750', features: ['603hp V8', 'AMG Performance', 'Carbon fiber', 'Track mode', 'Drift mode'] },
  ],

  // ============== AUDI ==============
  'Audi A4': [
    { id: '40-premium', name: '40 Premium', price: '$43,800', features: ['10.1" touchscreen', 'Apple CarPlay', 'Audi pre sense', 'LED headlights', 'Virtual cockpit'] },
    { id: '40-premium-plus', name: '40 Premium Plus', price: '$48,300', recommended: true, features: ['All Premium features', 'Bang & Olufsen audio', 'Navigation', 'Wireless charging', 'Park assist'] },
    { id: '45-prestige', name: '45 Prestige', price: '$54,000', features: ['261hp Turbo', 'All Premium Plus features', 'Matrix LED', 'Head-up display', 'Adaptive suspension'] },
    { id: 's4', name: 'S4 Premium Plus', price: '$56,800', features: ['349hp V6', 'Quattro AWD', 'Sport diff', 'Sport exhaust', 'S Sport seats'] },
  ],
  'Audi Q7': [
    { id: '45-premium', name: '45 Premium', price: '$61,900', features: ['10.1" dual displays', 'Apple CarPlay', 'Audi pre sense', 'LED headlights', 'Virtual cockpit'] },
    { id: '45-premium-plus', name: '45 Premium Plus', price: '$67,200', recommended: true, features: ['All Premium features', 'Bang & Olufsen audio', 'Navigation', 'Panoramic roof', 'Park assist'] },
    { id: '55-prestige', name: '55 Prestige', price: '$74,200', features: ['335hp V6', 'All Premium Plus features', 'HD Matrix LED', 'Head-up display', 'Air suspension'] },
    { id: 'sq7', name: 'SQ7 Premium Plus', price: '$92,700', features: ['500hp V8', 'Quattro Sport diff', 'Sport exhaust', 'S Sport seats', 'Carbon accents'] },
  ],

  // ============== TESLA ==============
  'Tesla Model 3': [
    { id: 'rwd', name: 'Rear-Wheel Drive', price: '$40,240', features: ['15.4" touchscreen', 'Autopilot', '272-mile range', 'Glass roof', 'Premium audio'] },
    { id: 'long-range-awd', name: 'Long Range AWD', price: '$47,240', recommended: true, features: ['All RWD features', 'Dual Motor AWD', '333-mile range', 'Premium connectivity', 'Fast charging'] },
    { id: 'performance', name: 'Performance', price: '$53,240', features: ['All Long Range features', '3.1s 0-60', 'Track Mode', 'Carbon spoiler', 'Performance brakes'] },
  ],
  'Tesla Model Y': [
    { id: 'rwd', name: 'Rear-Wheel Drive', price: '$44,990', features: ['15.4" touchscreen', 'Autopilot', '260-mile range', 'Glass roof', '5 seats'] },
    { id: 'long-range-awd', name: 'Long Range AWD', price: '$49,990', recommended: true, features: ['All RWD features', 'Dual Motor AWD', '310-mile range', 'Premium audio', '7 seat option'] },
    { id: 'performance', name: 'Performance', price: '$53,990', features: ['All Long Range features', '3.5s 0-60', 'Track Mode', 'Performance brakes', 'Lowered suspension'] },
  ],
  'Tesla Model S': [
    { id: 'dual-motor', name: 'Dual Motor AWD', price: '$74,990', features: ['17" touchscreen', 'Autopilot', '405-mile range', 'Yoke steering', 'Gaming computer'] },
    { id: 'plaid', name: 'Plaid', price: '$89,990', recommended: true, features: ['All Dual Motor features', 'Tri Motor 1,020hp', '1.99s 0-60', '200mph top speed', 'Track Mode'] },
  ],
  'Tesla Cybertruck': [
    { id: 'rwd', name: 'RWD', price: '$60,990', features: ['18.5" touchscreen', 'Autopilot', '250-mile range', 'Stainless steel body', 'Vault bed'] },
    { id: 'awd', name: 'AWD', price: '$79,990', recommended: true, features: ['All RWD features', 'Dual Motor AWD', '340-mile range', 'Adaptive air suspension', '11,000 lb towing'] },
    { id: 'cyberbeast', name: 'Cyberbeast', price: '$99,990', features: ['All AWD features', 'Tri Motor 845hp', '2.6s 0-60', '320-mile range', '14,000 lb towing'] },
  ],

  // ============== PORSCHE ==============
  'Porsche 911': [
    { id: 'carrera', name: 'Carrera', price: '$115,400', features: ['379hp flat-6', 'PCM touchscreen', 'Sport Chrono', 'PASM suspension', 'Sport exhaust'] },
    { id: 'carrera-s', name: 'Carrera S', price: '$131,400', recommended: true, features: ['443hp flat-6', 'All Carrera features', 'PASM Sport', 'Sport Design package', 'Bose audio'] },
    { id: 'carrera-4s', name: 'Carrera 4S', price: '$139,100', features: ['443hp flat-6', 'All-wheel drive', 'All Carrera S features', 'Wider body', 'PTV Plus'] },
    { id: 'turbo', name: 'Turbo', price: '$180,800', features: ['572hp twin-turbo', 'AWD', 'PDCC Sport', 'Ceramic brakes', 'Sport Design'] },
    { id: 'turbo-s', name: 'Turbo S', price: '$217,800', features: ['640hp twin-turbo', 'All Turbo features', 'Lightweight package', 'PCCB brakes', 'Exclusive design'] },
  ],
  'Porsche Cayenne': [
    { id: 'base', name: 'Cayenne', price: '$76,550', features: ['12.6" touchscreen', 'PCM', 'PASM', 'LED headlights', 'Power liftgate'] },
    { id: 's', name: 'Cayenne S', price: '$96,550', recommended: true, features: ['474hp V8', 'All Cayenne features', 'Sport Chrono', 'Air suspension', '21" wheels'] },
    { id: 'e-hybrid', name: 'Cayenne E-Hybrid', price: '$89,950', features: ['Plug-in hybrid', '463hp', 'All Cayenne features', '24-mile EV range', 'Sport Chrono'] },
    { id: 'turbo-e-hybrid', name: 'Turbo E-Hybrid', price: '$163,750', features: ['729hp hybrid V8', 'PDCC', 'PTV Plus', 'Ceramic brakes', 'Sport Design'] },
  ],
  'Porsche Taycan': [
    { id: 'base', name: 'Taycan', price: '$92,900', features: ['10.9" touchscreen', '402hp', 'RWD', 'PASM', 'LED headlights'] },
    { id: '4s', name: 'Taycan 4S', price: '$110,300', recommended: true, features: ['536hp', 'AWD', 'All Taycan features', 'Performance Battery Plus', 'Sport Chrono'] },
    { id: 'turbo', name: 'Taycan Turbo', price: '$150,900', features: ['670hp', 'AWD', 'Air suspension', 'Ceramic brakes available', 'PDCC Sport'] },
    { id: 'turbo-s', name: 'Taycan Turbo S', price: '$192,400', features: ['750hp', 'All Turbo features', 'PCCB brakes', '2.4s 0-60', 'Exclusive Design'] },
  ],

  // ============== VOLKSWAGEN ==============
  'Volkswagen Jetta': [
    { id: 's', name: 'S', price: '$22,265', features: ['6.5" touchscreen', 'Apple CarPlay/Android Auto', 'IQ.DRIVE safety', 'LED headlights', 'Rear camera'] },
    { id: 'sport', name: 'Sport', price: '$25,595', features: ['All S features', '8.0" touchscreen', 'Sport styling', 'Alloy wheels', 'Sport suspension'] },
    { id: 'se', name: 'SE', price: '$26,765', recommended: true, features: ['All Sport features', 'Heated seats', 'Digital cockpit', 'Wireless charging', 'App-Connect'] },
    { id: 'sel', name: 'SEL', price: '$30,515', features: ['All SE features', 'Leather seats', 'Sunroof', 'Premium audio', 'Ventilated seats'] },
  ],
  'Volkswagen Golf GTI': [
    { id: 's', name: 'S', price: '$31,625', features: ['8.25" touchscreen', '241hp Turbo', 'GTI styling', 'Sport suspension', 'Digital cockpit'] },
    { id: 'se', name: 'SE', price: '$35,925', recommended: true, features: ['All S features', '10.0" touchscreen', 'Harman Kardon audio', 'Sunroof', 'DCC adaptive dampers'] },
    { id: 'autobahn', name: 'Autobahn', price: '$41,685', features: ['All SE features', 'Leather seats', 'Navigation', 'Driver assistance', 'LED Matrix headlights'] },
  ],
  'Volkswagen Golf R': [
    { id: 'base', name: 'Golf R', price: '$46,040', features: ['10.0" touchscreen', '315hp Turbo', 'AWD', 'R Performance Torque Vectoring', 'DCC adaptive dampers'] },
    { id: '20th-anniversary', name: '20th Anniversary', price: '$49,040', recommended: true, features: ['All Golf R features', 'Akrapovič exhaust', '20th Anniversary badging', 'Unique wheels', 'Special interior'] },
  ],
  'Volkswagen Atlas': [
    { id: 's', name: 'S', price: '$37,375', features: ['8.0" touchscreen', 'Apple CarPlay/Android Auto', 'IQ.DRIVE safety', '7 passenger', 'Rear camera'] },
    { id: 'se', name: 'SE', price: '$42,375', features: ['All S features', '10.25" display', 'Heated seats', 'Power liftgate', 'Remote start'] },
    { id: 'se-r-line', name: 'SE R-Line', price: '$45,375', recommended: true, features: ['All SE features', 'R-Line styling', '21" wheels', 'Sport suspension', 'Black accents'] },
    { id: 'sel', name: 'SEL', price: '$48,875', features: ['All SE features', 'Leather seats', 'Ventilated seats', 'Fender audio', 'Navigation'] },
    { id: 'sel-premium', name: 'SEL Premium', price: '$54,575', features: ['All SEL features', 'V6 engine', 'Panoramic sunroof', 'Digital cockpit', 'Adaptive cruise'] },
  ],
  'Volkswagen ID.4': [
    { id: 'standard', name: 'Standard', price: '$38,995', features: ['12.0" touchscreen', 'IQ.DRIVE safety', 'RWD', '209-mile range', 'LED headlights'] },
    { id: 'pro', name: 'Pro', price: '$43,995', features: ['All Standard features', '275-mile range', 'Heated seats', 'Wireless charging', 'Power liftgate'] },
    { id: 'pro-s', name: 'Pro S', price: '$48,995', recommended: true, features: ['All Pro features', 'Panoramic roof', 'Premium audio', 'Navigation', '12" digital cockpit'] },
    { id: 'pro-s-plus', name: 'Pro S Plus', price: '$53,995', features: ['All Pro S features', 'AWD', 'Hands-free driving', 'Matrix LED lights', 'Travel Assist'] },
  ],
};

// Get trims for a specific vehicle
export const getVehicleTrims = (make: string, model: string, priceMin: number, priceMax: number): TrimData[] => {
  const key = `${make} ${model}`;
  
  // Return specific trims if we have them
  if (vehicleTrims[key]) {
    return vehicleTrims[key];
  }
  
  // Generate generic trims based on price range
  const midPrice = Math.round((priceMin + priceMax) / 2);
  
  return [
    {
      id: 'base',
      name: 'Base',
      price: `$${priceMin.toLocaleString()}`,
      features: ['Standard infotainment', 'Safety assist features', 'LED headlights', 'Rear camera', 'Bluetooth'],
    },
    {
      id: 'mid',
      name: 'Select',
      price: `$${midPrice.toLocaleString()}`,
      recommended: true,
      features: ['All Base features plus:', 'Larger touchscreen', 'Heated seats', 'Remote start', 'Premium audio'],
    },
    {
      id: 'top',
      name: 'Premium',
      price: `$${priceMax.toLocaleString()}`,
      features: ['All Select features plus:', 'Leather seating', 'Panoramic roof', 'Advanced safety', 'Premium interior'],
    },
  ];
};

// Get recommended trim name for a vehicle
export const getRecommendedTrimName = (make: string, model: string): string => {
  const key = `${make} ${model}`;
  
  if (vehicleTrims[key]) {
    const recommended = vehicleTrims[key].find(trim => trim.recommended);
    return recommended?.name || vehicleTrims[key][1]?.name || 'Select';
  }
  
  return 'Select';
};

// Check if vehicle has specific trims in database
export const hasSpecificTrims = (make: string, model: string): boolean => {
  const key = `${make} ${model}`;
  return !!vehicleTrims[key];
};
