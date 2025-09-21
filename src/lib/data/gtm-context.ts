// AI Agent Yasser — Comprehensive GTM Context v1
// Single-source context object for GTM Director agent
// Notes:
// 1) All price fields are placeholders. Replace when you have verified pricing.
// 2) Use product.id keys to reference in tools, prompts, or routing logic.
// 3) Extend safely: add new items without changing existing ids.

export const GTM_CONTEXT = {
  meta: {
    version: "1.0.0",
    owner: "e& UAE",
    prepared_for: "Director of GTM",
    last_updated_utc: "2025-08-10T14:00:00Z",
    regions_supported: ["UAE"],
    disclaimers: [
      "This is seed knowledge. Verify SKUs, prices, promos, and availability before committing.",
      "Regulatory and sector compliance rules must be confirmed with Legal and Security." 
    ]
  },

  offerings: {
    categories: [
      {
        key: "business_pro",
        label: "Business Pro Bundles",
        items: [
          {
            id: "bp_fiber_300",
            name: "Business Pro Fiber",
            short_desc: "All-in-one SME bundle: fiber internet, fixed voice, collaboration add-ons.",
            target_segments: ["SOHO", "SMB", "Retail", "Clinics", "Branches"],
            key_features: [
              "Symmetric fiber up to 300 Mbps",
              "Fixed line minutes bundle",
              "Optional Microsoft 365, domain, website, antivirus",
              "Business Online portal management"
            ],
            dependencies: ["last_mile_fiber"],
            starting_price_aed: "placeholder",
            availability: "Nationwide fiber-ready areas",
            cross_sell: ["m365_e3", "sase_basic", "cctv_pro_8cam", "utap_smartpos"],
            compliance: ["TRAI-equivalent local telecom policies", "Data protection: UAE"],
            links: { brochure: "placeholder", specs: "placeholder" }
          },
          {
            id: "bp_fiber_1g",
            name: "Business Pro Fiber 1 Gbps",
            short_desc: "Gigabit-capable bundle for multi-user sites and content-heavy teams.",
            target_segments: ["SMB", "Education", "Studios", "Startups"],
            key_features: [
              "Fiber up to 1 Gbps",
              "Optional static IPs",
              "Priority support",
              "Add-on security stack"
            ],
            dependencies: ["last_mile_fiber"],
            starting_price_aed: "placeholder",
            availability: "Fiber footprint",
            cross_sell: ["sase_advanced", "backup365", "cctv_pro_16cam", "wifi6_mesh_pro"],
            compliance: ["Local data residency if enabled"],
            links: { brochure: "placeholder", specs: "placeholder" }
          }
        ]
      },

      {
        key: "utap",
        label: "uTap Payments",
        items: [
          {
            id: "utap_smartpos",
            name: "uTap SmartPOS Android",
            short_desc: "All-in-one smart POS for card and contactless payments with apps.",
            target_segments: ["Retail", "F&B", "Beauty", "Clinics", "Pop-ups"],
            key_features: ["Contactless, chip, QR", "Receipt printer", "Inventory and reports"],
            dependencies: ["merchant_acquiring"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["business_pro", "mobile_business_plans", "wifi6_mesh_pro"],
            compliance: ["PCI DSS", "Central Bank merchant rules"],
            links: { brochure: "placeholder", specs: "placeholder" }
          },
          {
            id: "utap_softpos",
            name: "uTap SoftPOS",
            short_desc: "Tap-to-phone acceptance on Android devices.",
            target_segments: ["Micro merchants", "Couriers", "Events"],
            key_features: ["Contactless on NFC phones", "No extra hardware", "Digital receipts"],
            dependencies: ["merchant_acquiring"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["mobile_biz_unlimited", "m2m_iot_sims"],
            compliance: ["PCI CPoC"],
            links: { brochure: "placeholder", specs: "placeholder" }
          }
        ]
      },

      {
        key: "mobile_plans",
        label: "Mobile Business Plans",
        items: [
          {
            id: "mobile_biz_starter",
            name: "Business Mobile Starter",
            short_desc: "Entry plan with local minutes and data for field staff.",
            target_segments: ["Field", "Sales", "SOHO"],
            key_features: ["Local minutes", "Local data", "Optional international add-ons"],
            dependencies: ["mobile_network"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["utap_softpos", "m365_business_basic"],
            compliance: [],
            links: { brochure: "placeholder" }
          },
          {
            id: "mobile_biz_unlimited",
            name: "Business Mobile Unlimited",
            short_desc: "Unlimited local data and minutes with roaming packs.",
            target_segments: ["Executives", "Frequent travelers", "Managers"],
            key_features: ["Unlimited local data", "Generous roaming options", "5G-ready"],
            dependencies: ["5g_coverage"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["sase_mobile", "secure_mdm", "m365_e5"],
            compliance: [],
            links: { brochure: "placeholder" }
          }
        ]
      },

      {
        key: "fixed_services",
        label: "Fixed Services",
        items: [
          {
            id: "fixed_internet_dia",
            name: "Dedicated Internet Access (DIA)",
            short_desc: "SLA-backed dedicated bandwidth for mission-critical workloads.",
            target_segments: ["Finance", "Healthcare", "Government", "Hyperscalers"],
            key_features: ["1:1 bandwidth", "Static IPs", "Managed router options", "SLA 99.9%+"],
            dependencies: ["fiber_backbone"],
            starting_price_aed: "placeholder",
            availability: "Key business districts and data centers",
            cross_sell: ["sase_advanced", "cloud_connect"],
            compliance: ["Data sovereignty as applicable"],
            links: { brochure: "placeholder" }
          },
          {
            id: "mpls_vpn",
            name: "MPLS/IP VPN",
            short_desc: "Private WAN for multi-site enterprises.",
            target_segments: ["Retail chains", "Banks", "Logistics"],
            key_features: ["QoS classes", "Branch-to-DC", "Managed CPE"],
            dependencies: ["core_mpls"],
            starting_price_aed: "placeholder",
            availability: "Nationwide",
            cross_sell: ["sase_basic", "sdwan"],
            compliance: [],
            links: { brochure: "placeholder" }
          },
          {
            id: "sdwan",
            name: "SD-WAN Managed",
            short_desc: "App-aware routing across DIA, broadband, and LTE with central control.",
            target_segments: ["Multi-branch"],
            key_features: ["Zero-touch CPE", "Cloud gateways", "Analytics"],
            dependencies: ["internet_access"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["sase_advanced", "cloud_firewall"],
            compliance: [],
            links: { brochure: "placeholder" }
          }
        ]
      },

      {
        key: "security",
        label: "Cybersecurity",
        items: [
          {
            id: "sase_basic",
            name: "Secure Access Service Edge — Basic",
            short_desc: "Cloud-delivered secure web gateway and ZTNA for SMEs.",
            target_segments: ["SMB", "Education"],
            key_features: ["SWG", "DNS security", "ZTNA for core apps"],
            dependencies: ["internet_access"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["m365_business_premium", "mobile_biz_unlimited"],
            compliance: ["Basic data protection"],
            links: { brochure: "placeholder" }
          },
          {
            id: "sase_advanced",
            name: "Secure Access Service Edge — Advanced",
            short_desc: "Full SASE with CASB, DLP, FWaaS, and advanced threat protection.",
            target_segments: ["Finance", "Healthcare", "Government"],
            key_features: ["CASB", "DLP", "FWaaS", "Sandboxing"],
            dependencies: ["internet_access"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["sdwan", "cloud_connect", "m365_e5"],
            compliance: ["Sector-specific rules"],
            links: { brochure: "placeholder" }
          },
          {
            id: "secure_mdm",
            name: "Mobile Device Management",
            short_desc: "MDM/UEM for device fleet security and policy control.",
            target_segments: ["Field ops", "Education", "Healthcare"],
            key_features: ["App whitelisting", "Remote wipe", "Kiosk mode"],
            dependencies: ["mobile_network"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["mobile_biz_starter", "tablets_lte"],
            compliance: [],
            links: { brochure: "placeholder" }
          }
        ]
      },

      {
        key: "cctv_iot",
        label: "CCTV and IoT",
        items: [
          {
            id: "cctv_pro_8cam",
            name: "Managed CCTV — 8 Camera Bundle",
            short_desc: "Turnkey CCTV with storage, monitoring, and SLAs.",
            target_segments: ["Retail", "Warehouses", "Clinics"],
            key_features: ["8x cameras", "NVR or cloud", "Remote viewing app"],
            dependencies: ["internet_access"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["cctv_analytics", "alarm_monitoring"],
            compliance: ["CCTV data retention policies"],
            links: { brochure: "placeholder" }
          },
          {
            id: "cctv_analytics",
            name: "Video Analytics Add-on",
            short_desc: "People counting, heatmaps, queue analytics for retail ops.",
            target_segments: ["Retail", "Malls"],
            key_features: ["Footfall", "Dwell time", "Queue alerts"],
            dependencies: ["cctv_pro_8cam"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["utap_smartpos", "wifi_marketing"],
            compliance: ["Privacy notices per venue"],
            links: { brochure: "placeholder" }
          }
        ]
      },

      {
        key: "devices",
        label: "Devices: Laptops, Phones, Tablets, Routers",
        items: [
          {
            id: "laptop_std_i5",
            name: "Business Laptop i5 16GB 512GB",
            short_desc: "Fleet laptop standard spec with warranty and support.",
            target_segments: ["General workforce"],
            key_features: ["12–14\" FHD", "i5 class CPU", "16GB RAM", "512GB SSD"],
            dependencies: ["device_finance_optional"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["m365_business_premium", "secure_mdm"],
            compliance: [],
            links: { brochure: "placeholder" }
          },
          {
            id: "phone_5g_exec",
            name: "5G Executive Smartphone",
            short_desc: "Flagship 5G device for leadership roles.",
            target_segments: ["Executives"],
            key_features: ["5G", "Wi‑Fi 6E", "eSIM", "Strong camera"],
            dependencies: [],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["mobile_biz_unlimited", "secure_mdm"],
            compliance: [],
            links: { brochure: "placeholder" }
          },
          {
            id: "tablet_lte_field",
            name: "LTE Field Tablet 10\"",
            short_desc: "Rugged-friendly LTE tablet for field operations and softPOS.",
            target_segments: ["Logistics", "Field service", "F&B"],
            key_features: ["10\" display", "LTE", "Good battery"],
            dependencies: [],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["utap_softpos", "secure_mdm"],
            compliance: [],
            links: { brochure: "placeholder" }
          },
          {
            id: "wifi6_mesh_pro",
            name: "Wi‑Fi 6 Mesh Pro",
            short_desc: "Managed Wi‑Fi for offices and venues.",
            target_segments: ["SMB", "Education", "Hospitality"],
            key_features: ["Wi‑Fi 6", "Mesh", "Controller-managed"],
            dependencies: ["internet_access"],
            starting_price_aed: "placeholder",
            availability: "UAE",
            cross_sell: ["captive_portal_marketing", "sase_basic"],
            compliance: [],
            links: { brochure: "placeholder" }
          }
        ]
      },

      {
        key: "productivity",
        label: "Productivity and Cloud",
        items: [
          {
            id: "m365_business_basic",
            name: "Microsoft 365 Business Basic",
            short_desc: "Foundational email and collaboration.",
            target_segments: ["SOHO", "SMB"],
            key_features: ["Exchange Online", "OneDrive", "Teams"],
            dependencies: ["identity_tenant"],
            starting_price_aed: "placeholder",
            availability: "UAE via CSP",
            cross_sell: ["backup365", "sase_basic"],
            compliance: [],
            links: { brochure: "placeholder" }
          },
          {
            id: "m365_e5",
            name: "Microsoft 365 E5",
            short_desc: "Enterprise-grade security and productivity.",
            target_segments: ["Regulated enterprises"],
            key_features: ["Defender suite", "AIP/DLP", "Advanced compliance"],
            dependencies: ["identity_tenant"],
            starting_price_aed: "placeholder",
            availability: "UAE via CSP",
            cross_sell: ["sase_advanced", "sdwan"],
            compliance: [],
            links: { brochure: "placeholder" }
          },
          {
            id: "cloud_connect",
            name: "Cloud Connect",
            short_desc: "Private connectivity to major clouds from UAE.",
            target_segments: ["Multi-cloud enterprises"],
            key_features: ["Low latency", "Private paths", "SLA"],
            dependencies: ["carrier_neutral_dc"],
            starting_price_aed: "placeholder",
            availability: "Select DCs",
            cross_sell: ["dia", "sdwan", "sase_advanced"],
            compliance: [],
            links: { brochure: "placeholder" }
          }
        ]
      }
    ]
  },

  sectors: [
    {
      key: "government",
      name: "Government",
      sector_goals: ["Citizen services digitization", "Secure networks", "Gov cloud"],
      pain_points: ["Compliance", "Data residency", "Legacy WAN"],
      gtm_plays: [
        {
          play_id: "gov_secure_networks",
          hypothesis: "Agencies need secure remote access and cloud on-ramps.",
          recommend: ["sdwan", "sase_advanced", "cloud_connect", "m365_e5"],
          proof_points: ["SLA uptime", "Zero trust", "Case studies"]
        },
        {
          play_id: "smart_city_video",
          hypothesis: "Municipalities need CCTV analytics for safety and planning.",
          recommend: ["cctv_pro_8cam", "cctv_analytics", "dia"],
          proof_points: ["Heatmaps", "Queue management", "Operational insights"]
        }
      ]
    },
    {
      key: "education",
      name: "Education",
      sector_goals: ["Hybrid learning", "Campus Wi‑Fi", "Device programs"],
      pain_points: ["Budget", "Content filtering", "Device control"],
      gtm_plays: [
        {
          play_id: "edu_campus_wifi",
          hypothesis: "Schools need safe, high-density Wi‑Fi.",
          recommend: ["wifi6_mesh_pro", "sase_basic", "m365_business_basic"],
          proof_points: ["Content filtering", "e-learning readiness"]
        },
        {
          play_id: "edu_device_uem",
          hypothesis: "Tablets with UEM reduce classroom friction.",
          recommend: ["tablet_lte_field", "secure_mdm"],
          proof_points: ["Remote lock/wipe", "Kiosk mode"]
        }
      ]
    },
    {
      key: "finance",
      name: "Finance and Banking",
      sector_goals: ["Always-on branches", "Secure remote work", "Payments"],
      pain_points: ["Regulation", "Fraud risk", "Latency"],
      gtm_plays: [
        {
          play_id: "fin_branch_resilience",
          hypothesis: "Branches require SLA connectivity and zero trust.",
          recommend: ["mpls_vpn", "sdwan", "sase_advanced"],
          proof_points: ["SLA 99.9%+", "DLP, CASB"]
        },
        {
          play_id: "fin_merchant_services",
          hypothesis: "Bank partners cross-sell merchant acquiring with uTap.",
          recommend: ["utap_smartpos", "utap_softpos", "mobile_biz_unlimited"],
          proof_points: ["PCI compliance", "Faster onboarding"]
        }
      ]
    },
    {
      key: "retail",
      name: "Retail",
      sector_goals: ["Faster checkout", "Footfall insights", "Omnichannel"],
      pain_points: ["Queueing", "Shrinkage", "Wi‑Fi dead zones"],
      gtm_plays: [
        {
          play_id: "retail_checkout_speed",
          hypothesis: "SoftPOS and reliable Wi‑Fi speed checkout.",
          recommend: ["utap_softpos", "wifi6_mesh_pro", "cctv_analytics"],
          proof_points: ["Reduced queue times", "Heatmaps"]
        }
      ]
    },
    {
      key: "logistics",
      name: "Logistics",
      sector_goals: ["Fleet connectivity", "Warehouse safety", "Rugged devices"],
      pain_points: ["Coverage gaps", "Manual processes"],
      gtm_plays: [
        {
          play_id: "logi_field_ops",
          hypothesis: "LTE tablets + MDM streamline field ops.",
          recommend: ["tablet_lte_field", "secure_mdm", "mobile_biz_starter"],
          proof_points: ["Reduced errors", "Real-time tracking"]
        }
      ]
    },
    {
      key: "manufacturing",
      name: "Manufacturing",
      sector_goals: ["OT segmentation", "CCTV safety", "Private 5G ready"],
      pain_points: ["Latency", "Security across IT/OT"],
      gtm_plays: [
        {
          play_id: "mfg_secure_ot",
          hypothesis: "SASE + SD-WAN isolate OT and secure access.",
          recommend: ["sdwan", "sase_advanced", "dia", "cctv_pro_8cam"],
          proof_points: ["Microsegmentation", "SLA"]
        }
      ]
    },
    {
      key: "agriculture",
      name: "Agriculture",
      sector_goals: ["IoT sensing", "Cold-chain visibility"],
      pain_points: ["Rural coverage", "Battery life"],
      gtm_plays: [
        {
          play_id: "agri_iot",
          hypothesis: "IoT SIMs plus analytics improve yields.",
          recommend: ["m2m_iot_sims", "dia", "sdwan"],
          proof_points: ["Sensors online", "Alerting"]
        }
      ]
    },
    {
      key: "tech_telecom",
      name: "Tech and Telecom",
      sector_goals: ["Multi-cloud", "Developer productivity", "Low-latency links"],
      pain_points: ["Vendor sprawl", "Shadow IT"],
      gtm_plays: [
        {
          play_id: "tech_cloud_connect",
          hypothesis: "Private cloud on-ramps reduce egress risk.",
          recommend: ["cloud_connect", "dia", "sase_advanced"],
          proof_points: ["Latency tests", "Throughput"]
        }
      ]
    },
    {
      key: "healthcare",
      name: "Healthcare",
      sector_goals: ["Patient data protection", "Telemedicine", "CCTV compliance"],
      pain_points: ["PHI privacy", "Branch reliability"],
      gtm_plays: [
        {
          play_id: "hc_secure_clinics",
          hypothesis: "Clinics need zero trust and managed CCTV.",
          recommend: ["sase_advanced", "sdwan", "cctv_pro_8cam"],
          proof_points: ["Audit logs", "DLP"]
        }
      ]
    },
    {
      key: "hospitality",
      name: "Hospitality",
      sector_goals: ["Guest Wi‑Fi", "Payments", "CCTV"],
      pain_points: ["Roaming guests", "High density"],
      gtm_plays: [
        {
          play_id: "hosp_guest_wifi",
          hypothesis: "Wi‑Fi 6 mesh plus captive portal boosts reviews.",
          recommend: ["wifi6_mesh_pro", "captive_portal_marketing", "utap_smartpos"],
          proof_points: ["Speed tests", "Dwell time"]
        }
      ]
    }
  ],

  partnerships: {
    categories: [
      {
        key: "events",
        label: "Events and Exhibitions",
        items: [
          { id: "event_gitex", name: "GITEX Global", type: "Expo", role: "Sponsor/Partner", value: ["Lead gen", "Showcase"] },
          { id: "event_leap", name: "LEAP", type: "Expo", role: "Partner", value: ["Regional reach"] }
        ]
      },
      {
        key: "banks",
        label: "Banking Partners",
        items: [
          { id: "bank_partner_1", name: "Partner Bank A", type: "Acquiring", role: "Merchant services", value: ["Co-sell uTap", "Financing bundles"] }
        ]
      },
      {
        key: "datacenters",
        label: "Data Centers and Cloud",
        items: [
          { id: "dc_partner_1", name: "Local DC A", type: "Carrier-neutral", role: "Cloud on-ramp", value: ["Low latency", "Private peering"] }
        ]
      },
      {
        key: "culture_venues",
        label: "Cultural Venues",
        items: [
          { id: "venue_partner_1", name: "Venue A", type: "Arts", role: "Wi‑Fi and POS", value: ["Brand presence", "Hospitality bundles"] }
        ]
      },
      {
        key: "tech_alliances",
        label: "Tech and Telecom Alliances",
        items: [
          { id: "tech_partner_sase", name: "SASE Vendor", type: "Security", role: "Cloud security", value: ["CASB", "DLP"] },
          { id: "tech_partner_sdwan", name: "SD‑WAN Vendor", type: "Network", role: "Edge overlay", value: ["App‑aware routing"] }
        ]
      },
      {
        key: "drones_ai",
        label: "Drones and AI",
        items: [
          { id: "drone_partner_1", name: "DroneCo A", type: "Drones", role: "Aerial ops", value: ["Surveys", "Security"] },
          { id: "ai_partner_1", name: "AICo A", type: "AI", role: "Analytics", value: ["Video analytics", "Forecasting"] }
        ]
      }
    ]
  },

  routing: {
    // Simple need-to-product mapping for quick recommendations
    rules: [
      { need: "secure_remote_access", recommend: ["sase_basic", "sase_advanced", "sdwan"] },
      { need: "checkout_payments", recommend: ["utap_softpos", "utap_smartpos"] },
      { need: "branch_connectivity", recommend: ["mpls_vpn", "sdwan", "dia"] },
      { need: "guest_wifi", recommend: ["wifi6_mesh_pro", "captive_portal_marketing"] },
      { need: "video_surveillance", recommend: ["cctv_pro_8cam", "cctv_analytics"] },
      { need: "executive_mobility", recommend: ["mobile_biz_unlimited", "phone_5g_exec", "secure_mdm"] }
    ]
  },

  templates: {
    discovery_questions: [
      "How many sites and how many remote users do you have today?",
      "Which apps are mission-critical and where are they hosted?",
      "Any compliance or data residency requirements?",
      "Peak footfall and checkout volume per location?",
      "CCTV retention policy and analytics needs?",
      "Device fleet size and OS mix for MDM?"
    ],

    pitch_openers: [
      "We unify connectivity, security, devices, and payments into one managed stack so your teams can execute without friction.",
      "Let us convert downtime risk into SLA-backed reliability with secure cloud on-ramps and zero trust." 
    ],

    email_templates: {
      intro: {
        subject: "Enabling secure growth with e& Business Pro and uTap",
        body: "Hi {name},\n\nBased on your multi-site footprint and checkout volumes, I recommend a combined approach: SD‑WAN for resilient branches, SASE for zero-trust access, Wi‑Fi 6 for high-density, and uTap for faster payments. We can stage this in phases without disrupting operations.\n\nIf you share site count and current providers, I will return a phased plan and budgetary estimate.\n\nRegards,\n{sender}"
      },
      followup: {
        subject: "Next steps and preliminary bill of materials",
        body: "Hi {name},\n\nAttached is a preliminary BOM with options for connectivity, security, CCTV, Wi‑Fi, and payment acceptance. Pricing is placeholder pending survey and coverage checks.\n\nIf you can confirm locations and peak loads, we will validate feasibility and timelines.\n\nRegards,\n{sender}"
      }
    },

    call_script: [
      "Open with business driver: growth, risk, or efficiency.",
      "Quantify impact: current downtime, checkout time, security events.",
      "Map needs to stack: connectivity → security → devices → payments.",
      "Propose phased rollout and quick wins in 30 days.",
      "Agree next steps: survey, pilot site, legal/compliance review."
    ]
  },

  pricing_and_slas: {
    notes: [
      "All prices are placeholders; confirm current catalog.",
      "DIA and MPLS include SLAs with credits; verify per contract.",
      "CCTV retention and analytics may incur storage costs." 
    ],
    typical_sla: { uptime: "99.9%+", response_time: "business-hours or 24x7 per tier" }
  },

  compliance: { 
    general: [
      "Data protection and privacy per UAE regulations",
      "PCI DSS for payment acceptance",
      "Sector policies for healthcare and finance"
    ],
    notes: "Always align with customer legal and risk teams for final approval."
  }
};

export default GTM_CONTEXT;
