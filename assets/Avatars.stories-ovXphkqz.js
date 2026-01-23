import{j as e}from"./iframe-CSJ_5fud.js";import{U as f}from"./user-E7EPHmVk.js";import{D as S}from"./dollar-sign-CcV_X40h.js";import{C as g}from"./car-CVJTtMk8.js";import{Z as I}from"./zap-D8IOnPZA.js";import{L as A}from"./leaf-C4_zualY.js";import{C as w}from"./compass-CcnGqfEp.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-C1cD1rkR.js";const i={container:{padding:"2rem",fontFamily:"var(--font-body)"},section:{marginBottom:"3rem"},sectionTitle:{fontSize:"1.5rem",fontWeight:600,marginBottom:"1rem",color:"var(--color-gray-900, #1a1a1a)"},sectionDescription:{color:"var(--color-gray-600, #666)",marginBottom:"1.5rem",lineHeight:1.6},grid:{display:"flex",flexWrap:"wrap",gap:"2rem",alignItems:"flex-end"},avatarItem:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem"},label:{fontSize:"0.75rem",color:"var(--color-gray-500, #888)",fontFamily:"monospace"},previewBox:{padding:"2rem",backgroundColor:"var(--color-gray-50, #f9f9f9)",borderRadius:"12px",border:"1px solid var(--color-gray-200, #e5e5e5)"},codeBlock:{backgroundColor:"var(--color-gray-900, #1a1a1a)",color:"#e5e5e5",padding:"1rem",borderRadius:"8px",fontSize:"0.875rem",fontFamily:"monospace",overflow:"auto",marginTop:"1rem"}},h={xs:24,sm:32,md:40,lg:56,xl:80,"2xl":120},s=({size:t="md",name:r="User",image:a,variant:n="initials"})=>{const v=h[t],j=v*.4,b=z=>{const y=z.split(" ");return y.length>=2?`${y[0][0]}${y[1][0]}`.toUpperCase():y[0].substring(0,2).toUpperCase()},p={width:v,height:v,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0};return n==="image"&&a?e.jsx("div",{style:p,children:e.jsx("img",{src:a,alt:r,style:{width:"100%",height:"100%",objectFit:"cover"}})}):n==="icon"?e.jsx("div",{style:{...p,backgroundColor:"var(--color-gray-100, #f5f5f5)",border:"1px solid var(--color-gray-200, #e5e5e5)"},children:e.jsx(f,{size:v*.5,color:"var(--color-gray-400, #999)"})}):e.jsx("div",{style:{...p,backgroundColor:"var(--color-blue-cobalt, #2676DF)",color:"white",fontSize:j,fontWeight:600,fontFamily:"Inter, sans-serif"},children:b(r)})},x={family:{image:"https://d2kde5ohu8qb21.cloudfront.net/files/66466b819cbba1000852d78b/2025-honda-pilot-exterior-front-view.jpg",label:"Family",icon:e.jsx(f,{size:16})},adventure:{image:"https://d2kde5ohu8qb21.cloudfront.net/files/66466a749cbba1000852d76d/2025-jeep-wrangler-exterior-front-view.jpg",label:"Adventure",icon:e.jsx(w,{size:16})},luxury:{image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",label:"Luxury",icon:e.jsx(g,{size:16})},"eco-friendly":{image:"https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg",label:"Eco-Friendly",icon:e.jsx(A,{size:16})},performance:{image:"https://d2kde5ohu8qb21.cloudfront.net/files/66e8824d603db5000878f458/2025hondaaccordhybridfrontthreequarters.jpg",label:"Performance",icon:e.jsx(I,{size:16})},commuter:{image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",label:"Commuter",icon:e.jsx(g,{size:16})},value:{image:"https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg",label:"Value",icon:e.jsx(S,{size:16})}},u=({lifestyle:t,size:r="md"})=>{const a=h[r],n=x[t];return n?e.jsx("div",{style:{width:a,height:a,borderRadius:"50%",overflow:"hidden",border:"2px solid var(--color-blue-cobalt, #2676DF)"},children:e.jsx("img",{src:n.image,alt:n.label,style:{width:"100%",height:"100%",objectFit:"cover"}})}):e.jsx(s,{size:r,name:"User"})},J={title:"Elements/Avatars",parameters:{layout:"fullscreen",docs:{description:{component:"User avatars with initials, images, and lifestyle-based vehicle images."}}}},o={render:()=>e.jsx("div",{style:i.container,children:e.jsxs("div",{style:i.section,children:[e.jsx("h2",{style:i.sectionTitle,children:"Avatar Sizes"}),e.jsx("p",{style:i.sectionDescription,children:"Six sizes available for different contexts throughout the application."}),e.jsx("div",{style:i.previewBox,children:e.jsx("div",{style:i.grid,children:Object.keys(h).map(t=>e.jsxs("div",{style:i.avatarItem,children:[e.jsx(s,{size:t,name:"John Doe"}),e.jsxs("span",{style:i.label,children:[t," (",h[t],"px)"]})]},t))})})]})})},l={render:()=>e.jsx("div",{style:i.container,children:e.jsxs("div",{style:i.section,children:[e.jsx("h2",{style:i.sectionTitle,children:"Avatar Variants"}),e.jsx("p",{style:i.sectionDescription,children:"Avatars can display initials, images, or a placeholder icon."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"1rem"},children:"Initials (Default)"}),e.jsx("div",{style:i.previewBox,children:e.jsxs("div",{style:i.grid,children:[e.jsxs("div",{style:i.avatarItem,children:[e.jsx(s,{size:"lg",name:"John Doe",variant:"initials"}),e.jsx("span",{style:i.label,children:"John Doe → JD"})]}),e.jsxs("div",{style:i.avatarItem,children:[e.jsx(s,{size:"lg",name:"Alice",variant:"initials"}),e.jsx("span",{style:i.label,children:"Alice → AL"})]}),e.jsxs("div",{style:i.avatarItem,children:[e.jsx(s,{size:"lg",name:"Bob Smith Johnson",variant:"initials"}),e.jsx("span",{style:i.label,children:"Bob Smith → BS"})]})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"1rem"},children:"Image"}),e.jsx("div",{style:i.previewBox,children:e.jsx("div",{style:i.grid,children:e.jsxs("div",{style:i.avatarItem,children:[e.jsx(s,{size:"lg",name:"User",variant:"image",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"}),e.jsx("span",{style:i.label,children:"Custom image"})]})})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"1rem"},children:"Icon Placeholder"}),e.jsx("div",{style:i.previewBox,children:e.jsx("div",{style:i.grid,children:e.jsxs("div",{style:i.avatarItem,children:[e.jsx(s,{size:"lg",variant:"icon"}),e.jsx("span",{style:i.label,children:"No user data"})]})})})]})]})]})})},d={render:()=>e.jsx("div",{style:i.container,children:e.jsxs("div",{style:i.section,children:[e.jsx("h2",{style:i.sectionTitle,children:"Lifestyle Avatars"}),e.jsx("p",{style:i.sectionDescription,children:"Users can choose a lifestyle-based avatar that displays a vehicle representing their interests. These are used in the profile and account sections."}),e.jsx("div",{style:i.previewBox,children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(120px, 1fr))",gap:"1.5rem"},children:Object.entries(x).map(([t,r])=>e.jsxs("div",{style:{...i.avatarItem,gap:"0.75rem"},children:[e.jsx(u,{lifestyle:t,size:"xl"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[r.icon,e.jsx("span",{style:{fontSize:"0.875rem",fontWeight:500},children:r.label})]})]},t))})})]})})},c={render:()=>e.jsx("div",{style:i.container,children:e.jsxs("div",{style:i.section,children:[e.jsx("h2",{style:i.sectionTitle,children:"Avatars in Context"}),e.jsx("p",{style:i.sectionDescription,children:"Examples of how avatars appear in various UI patterns."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"1rem"},children:"Header / Navigation"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.75rem 1rem",backgroundColor:"var(--color-dark, #222)",borderRadius:"8px"},children:[e.jsx("span",{style:{color:"white",fontWeight:600},children:"Car and Driver"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[e.jsx("span",{style:{color:"white",fontSize:"0.875rem"},children:"John D."}),e.jsx(s,{size:"sm",name:"John Doe"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"1rem"},children:"Comment / Review"}),e.jsxs("div",{style:{display:"flex",gap:"1rem",padding:"1rem",backgroundColor:"var(--color-gray-50, #f9f9f9)",borderRadius:"8px"},children:[e.jsx(s,{size:"md",name:"Sarah Miller"}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.25rem"},children:[e.jsx("span",{style:{fontWeight:600,fontSize:"0.875rem"},children:"Sarah Miller"}),e.jsx("span",{style:{color:"var(--color-gray-500)",fontSize:"0.75rem"},children:"2 days ago"})]}),e.jsx("p",{style:{fontSize:"0.875rem",color:"var(--color-gray-700)",lineHeight:1.5},children:"Great vehicle! The fuel economy exceeded my expectations."})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"1rem"},children:"Profile Card"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"2rem",backgroundColor:"white",borderRadius:"12px",border:"1px solid var(--color-gray-200)",maxWidth:"280px"},children:[e.jsx(u,{lifestyle:"performance",size:"xl"}),e.jsx("h4",{style:{marginTop:"1rem",fontSize:"1.125rem",fontWeight:600},children:"Alex Thompson"}),e.jsx("p",{style:{color:"var(--color-gray-500)",fontSize:"0.875rem"},children:"Performance Enthusiast"}),e.jsxs("div",{style:{display:"flex",gap:"2rem",marginTop:"1rem"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontWeight:600},children:"12"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Saved"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontWeight:600},children:"5"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Reviews"})]})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"1rem"},children:"Avatar Group"}),e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[["John Doe","Sarah M","Alex T","Maria G"].map((t,r)=>e.jsx("div",{style:{marginLeft:r>0?"-8px":0},children:e.jsx("div",{style:{border:"2px solid white",borderRadius:"50%"},children:e.jsx(s,{size:"sm",name:t})})},t)),e.jsx("div",{style:{marginLeft:"-8px",width:32,height:32,borderRadius:"50%",backgroundColor:"var(--color-gray-200)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:600,color:"var(--color-gray-600)",border:"2px solid white"},children:"+8"})]})]})]})]})})},m={render:()=>e.jsx("div",{style:i.container,children:e.jsxs("div",{style:i.section,children:[e.jsx("h2",{style:i.sectionTitle,children:"Implementation"}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"0.5rem"},children:"Avatar Utilities"}),e.jsxs("p",{style:i.sectionDescription,children:["Use the avatar utilities from ",e.jsx("code",{children:"src/utils/avatarUtils.ts"}),":"]}),e.jsx("pre",{style:i.codeBlock,children:`import { getAvatarImageUrl, getUserInitials } from '../utils/avatarUtils';

// Get initials from name
const initials = getUserInitials('John Doe'); // "JD"
const initials2 = getUserInitials('Alice'); // "AL"

// Get lifestyle avatar image URL
const imageUrl = getAvatarImageUrl('avatar-family'); 
// Returns Honda Pilot image URL

const imageUrl2 = getAvatarImageUrl('initials'); 
// Returns null (use initials instead)`}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"Basic Avatar Component"}),e.jsx("pre",{style:i.codeBlock,children:`interface AvatarProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  name?: string;
  image?: string;
}

const Avatar: React.FC<AvatarProps> = ({ size, name, image }) => {
  const sizes = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80, '2xl': 120 };
  const dimension = sizes[size];

  if (image) {
    return (
      <div style={{
        width: dimension,
        height: dimension,
        borderRadius: '50%',
        overflow: 'hidden',
      }}>
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  return (
    <div style={{
      width: dimension,
      height: dimension,
      borderRadius: '50%',
      backgroundColor: 'var(--color-blue-cobalt)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: dimension * 0.4,
      fontWeight: 600,
    }}>
      {getUserInitials(name)}
    </div>
  );
};`}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"CSS Variables Used"}),e.jsx("pre",{style:i.codeBlock,children:`/* Avatar colors */
--color-blue-cobalt: #1B5F8A    /* Initials background */
--color-gray-100: #f5f5f5       /* Icon placeholder background */
--color-gray-200: #e5e5e5       /* Icon placeholder border */
--color-gray-400: #999          /* Icon color */

/* Border radius */
--border-radius-full: 9999px    /* Circular avatars */`})]})})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Avatar Sizes</h2>
        <p style={styles.sectionDescription}>
          Six sizes available for different contexts throughout the application.
        </p>
        
        <div style={styles.previewBox}>
          <div style={styles.grid}>
            {(Object.keys(SIZES) as Array<keyof typeof SIZES>).map(size => <div key={size} style={styles.avatarItem}>
                <Avatar size={size} name="John Doe" />
                <span style={styles.label}>{size} ({SIZES[size]}px)</span>
              </div>)}
          </div>
        </div>
      </div>
    </div>
}`,...o.parameters?.docs?.source},description:{story:"All avatar sizes from extra small to extra extra large.",...o.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Avatar Variants</h2>
        <p style={styles.sectionDescription}>
          Avatars can display initials, images, or a placeholder icon.
        </p>
        
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
          <div>
            <h3 style={{
            fontSize: '1rem',
            fontWeight: 500,
            marginBottom: '1rem'
          }}>Initials (Default)</h3>
            <div style={styles.previewBox}>
              <div style={styles.grid}>
                <div style={styles.avatarItem}>
                  <Avatar size="lg" name="John Doe" variant="initials" />
                  <span style={styles.label}>John Doe → JD</span>
                </div>
                <div style={styles.avatarItem}>
                  <Avatar size="lg" name="Alice" variant="initials" />
                  <span style={styles.label}>Alice → AL</span>
                </div>
                <div style={styles.avatarItem}>
                  <Avatar size="lg" name="Bob Smith Johnson" variant="initials" />
                  <span style={styles.label}>Bob Smith → BS</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 style={{
            fontSize: '1rem',
            fontWeight: 500,
            marginBottom: '1rem'
          }}>Image</h3>
            <div style={styles.previewBox}>
              <div style={styles.grid}>
                <div style={styles.avatarItem}>
                  <Avatar size="lg" name="User" variant="image" image="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg" />
                  <span style={styles.label}>Custom image</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 style={{
            fontSize: '1rem',
            fontWeight: 500,
            marginBottom: '1rem'
          }}>Icon Placeholder</h3>
            <div style={styles.previewBox}>
              <div style={styles.grid}>
                <div style={styles.avatarItem}>
                  <Avatar size="lg" variant="icon" />
                  <span style={styles.label}>No user data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...l.parameters?.docs?.source},description:{story:"Different avatar display variants.",...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Lifestyle Avatars</h2>
        <p style={styles.sectionDescription}>
          Users can choose a lifestyle-based avatar that displays a vehicle representing their interests.
          These are used in the profile and account sections.
        </p>
        
        <div style={styles.previewBox}>
          <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1.5rem'
        }}>
            {Object.entries(LIFESTYLE_IMAGES).map(([key, config]) => <div key={key} style={{
            ...styles.avatarItem,
            gap: '0.75rem'
          }}>
                <LifestyleAvatar lifestyle={key} size="xl" />
                <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
                  {config.icon}
                  <span style={{
                fontSize: '0.875rem',
                fontWeight: 500
              }}>{config.label}</span>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>
}`,...d.parameters?.docs?.source},description:{story:"Lifestyle-based avatars that display representative vehicles.",...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Avatars in Context</h2>
        <p style={styles.sectionDescription}>
          Examples of how avatars appear in various UI patterns.
        </p>
        
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
          {/* Header example */}
          <div>
            <h3 style={{
            fontSize: '1rem',
            fontWeight: 500,
            marginBottom: '1rem'
          }}>Header / Navigation</h3>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--color-dark, #222)',
            borderRadius: '8px'
          }}>
              <span style={{
              color: 'white',
              fontWeight: 600
            }}>Car and Driver</span>
              <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
                <span style={{
                color: 'white',
                fontSize: '0.875rem'
              }}>John D.</span>
                <Avatar size="sm" name="John Doe" />
              </div>
            </div>
          </div>
          
          {/* Comment example */}
          <div>
            <h3 style={{
            fontSize: '1rem',
            fontWeight: 500,
            marginBottom: '1rem'
          }}>Comment / Review</h3>
            <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--color-gray-50, #f9f9f9)',
            borderRadius: '8px'
          }}>
              <Avatar size="md" name="Sarah Miller" />
              <div>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.25rem'
              }}>
                  <span style={{
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}>Sarah Miller</span>
                  <span style={{
                  color: 'var(--color-gray-500)',
                  fontSize: '0.75rem'
                }}>2 days ago</span>
                </div>
                <p style={{
                fontSize: '0.875rem',
                color: 'var(--color-gray-700)',
                lineHeight: 1.5
              }}>
                  Great vehicle! The fuel economy exceeded my expectations.
                </p>
              </div>
            </div>
          </div>
          
          {/* Profile card example */}
          <div>
            <h3 style={{
            fontSize: '1rem',
            fontWeight: 500,
            marginBottom: '1rem'
          }}>Profile Card</h3>
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid var(--color-gray-200)',
            maxWidth: '280px'
          }}>
              <LifestyleAvatar lifestyle="performance" size="xl" />
              <h4 style={{
              marginTop: '1rem',
              fontSize: '1.125rem',
              fontWeight: 600
            }}>Alex Thompson</h4>
              <p style={{
              color: 'var(--color-gray-500)',
              fontSize: '0.875rem'
            }}>Performance Enthusiast</p>
              <div style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '1rem'
            }}>
                <div style={{
                textAlign: 'center'
              }}>
                  <div style={{
                  fontWeight: 600
                }}>12</div>
                  <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Saved</div>
                </div>
                <div style={{
                textAlign: 'center'
              }}>
                  <div style={{
                  fontWeight: 600
                }}>5</div>
                  <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Reviews</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Avatar group */}
          <div>
            <h3 style={{
            fontSize: '1rem',
            fontWeight: 500,
            marginBottom: '1rem'
          }}>Avatar Group</h3>
            <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
              {['John Doe', 'Sarah M', 'Alex T', 'Maria G'].map((name, i) => <div key={name} style={{
              marginLeft: i > 0 ? '-8px' : 0
            }}>
                  <div style={{
                border: '2px solid white',
                borderRadius: '50%'
              }}>
                    <Avatar size="sm" name={name} />
                  </div>
                </div>)}
              <div style={{
              marginLeft: '-8px',
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'var(--color-gray-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-gray-600)',
              border: '2px solid white'
            }}>
                +8
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...c.parameters?.docs?.source},description:{story:"Avatars in realistic UI contexts.",...c.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Implementation</h2>
        
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginBottom: '0.5rem'
      }}>Avatar Utilities</h3>
        <p style={styles.sectionDescription}>
          Use the avatar utilities from <code>src/utils/avatarUtils.ts</code>:
        </p>
        <pre style={styles.codeBlock}>
        {\`import { getAvatarImageUrl, getUserInitials } from '../utils/avatarUtils';

// Get initials from name
const initials = getUserInitials('John Doe'); // "JD"
const initials2 = getUserInitials('Alice'); // "AL"

// Get lifestyle avatar image URL
const imageUrl = getAvatarImageUrl('avatar-family'); 
// Returns Honda Pilot image URL

const imageUrl2 = getAvatarImageUrl('initials'); 
// Returns null (use initials instead)\`}
        </pre>
        
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>Basic Avatar Component</h3>
        <pre style={styles.codeBlock}>
        {\`interface AvatarProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  name?: string;
  image?: string;
}

const Avatar: React.FC<AvatarProps> = ({ size, name, image }) => {
  const sizes = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80, '2xl': 120 };
  const dimension = sizes[size];

  if (image) {
    return (
      <div style={{
        width: dimension,
        height: dimension,
        borderRadius: '50%',
        overflow: 'hidden',
      }}>
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  return (
    <div style={{
      width: dimension,
      height: dimension,
      borderRadius: '50%',
      backgroundColor: 'var(--color-blue-cobalt)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: dimension * 0.4,
      fontWeight: 600,
    }}>
      {getUserInitials(name)}
    </div>
  );
};\`}
        </pre>

        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>CSS Variables Used</h3>
        <pre style={styles.codeBlock}>
        {\`/* Avatar colors */
--color-blue-cobalt: #1B5F8A    /* Initials background */
--color-gray-100: #f5f5f5       /* Icon placeholder background */
--color-gray-200: #e5e5e5       /* Icon placeholder border */
--color-gray-400: #999          /* Icon color */

/* Border radius */
--border-radius-full: 9999px    /* Circular avatars */\`}
        </pre>
      </div>
    </div>
}`,...m.parameters?.docs?.source},description:{story:"Implementation code and guidelines.",...m.parameters?.docs?.description}}};const E=["Sizes","Variants","LifestyleAvatars","InContext","Implementation"];export{m as Implementation,c as InContext,d as LifestyleAvatars,o as Sizes,l as Variants,E as __namedExportsOrder,J as default};
