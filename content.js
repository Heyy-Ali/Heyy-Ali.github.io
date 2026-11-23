// =====================================================================
//  YOUR WEBSITE CONTENT
//  Edit this file to change what the site says. You never need to touch
//  index.html, styles.css or main.js to add or change content.
//
//  Tips
//  - Each list item is wrapped in { ... } and separated by commas.
//    To add one, copy an existing item, paste it, and edit the text.
//  - "tags" can be ["sim"], ["lab"] or ["sim", "lab"].
//    sim = computational (cyan dot), lab = experimental (magenta dot).
//  - Images go in the images/ folder; put the filename in "image",
//    e.g. "image": "images/micropump.jpg". Leave it "" for no image.
//  - Leave "url" as "" if there is no link yet.
// =====================================================================

window.SITE = {
  name: "ALI HEYDARI",
  initials: "AH",
  pageTitle: "Ali Heydari | Microfluidics, CFD and experimental R&D",

  // The hero sentence. Wrap words in [sim]...[/sim] or [lab]...[/lab]
  // to color them cyan or magenta.
  tagline: "I [sim]design and simulate[/sim] flows, then [lab]build and test[/lab] the devices that use them.",

  about: [
    "Mechanical and biomedical engineer with 6+ years across CFD, multiphysics simulation, microfluidics and fabrication. I work in a loop: design a device, simulate it, print it, and measure whether it behaves the way the model said.",
    "I'm a PhD candidate at Penn State in the Active Biomaterials Lab, building enzyme-powered micropumps and micropropellers."
  ],

  links: {
    email: "afh5892@psu.edu",
    linkedin: "https://www.linkedin.com/in/ali-heydari-",
    scholar: "https://scholar.google.com/citations?user=IZk61N0AAAAJ&hl=en",
    cv: "" // e.g. "files/Ali_Heydari_CV.pdf" once you add the PDF
  },

  // ---------------------------------------------------------------
  //  Page labels: every heading, button and menu item on the site.
  //  [sim]...[/sim] and [lab]...[/lab] color words here too.
  //  A "link" starting with # jumps to a section on the page:
  //  #about, #work, #papers, #journey, #contact. It can also be a
  //  full web address like "https://...".
  // ---------------------------------------------------------------
  labels: {
    // Small line above your name on the landing page
    kicker: "DESIGN → [sim]SIMULATE[/sim] → [lab]BUILD[/lab]",

    // Buttons under the tagline (the first one is outlined in cyan)
    // color: "cyan", "magenta", "lime", "amber", "violet", "coral",
    //        any hex code like "#ff8800", or "" for a plain gray button
    heroButtons: [
      { text: "my journey", link: "#journey", color: "cyan" },
      { text: "selected work", link: "#work", color: "magenta" }
    ],

    // Items in the ☰ menu at the top right
    menu: [
      { text: "about", link: "#about" },
      { text: "work", link: "#work" },
      { text: "papers", link: "#papers" },
      { text: "journey", link: "#journey" },
      { text: "contact", link: "#contact" }
    ],

    // Section headings
    aboutTitle: "About me",
    workTitle: "Selected work",
    papersTitle: "Papers",
    papersMoreLink: "all papers on Google Scholar →", // "" hides it
    journeyTitle: "My journey",
    journeySubtitle: "From industrial ducts and heat sinks to enzyme-powered pumps",

    // The color legend shown next to "Selected work" and "My journey"
    legendSim: "simulation",
    legendLab: "lab work",

    // Footer
    contactButton: "get in touch"
  },

  // ---------------------------------------------------------------
  //  Selected work: shown as rows with sim tools and lab methods
  // ---------------------------------------------------------------
  projects: [
    {
      title: "Enzyme-driven micropump",
      summary: "Reaction–transport and solutal-buoyancy models that rectify flow in a micro-annular chamber, checked against SLA-printed prototypes. Reached 5 µm/s sustained pumping.",
      sim: ["COMSOL", "Python", "GPU"],
      lab: ["SLA printing", "microscopy"],
      image: "",
      url: ""
    },
    {
      title: "Enzymatic micropropellers",
      summary: "Propeller geometries printed by two-photon polymerization with enzyme on the fins, tuned with a design-of-experiments framework for rotation and propulsion.",
      sim: ["ANSYS", "C++", "DOE"],
      lab: ["two-photon printing", "enzyme coating"],
      image: "",
      url: ""
    },
    {
      title: "Microfluidic sperm-sorting chip",
      summary: "A rheotaxis-based sorting chip for IVF, designed alongside FEM models of flagellated swimmers and evaluated with CASA motility analysis.",
      sim: ["FEM", "MATLAB"],
      lab: ["microfabrication", "PTV"],
      image: "",
      url: ""
    },
    {
      title: "GPU-accelerated solvers",
      summary: "CuPy solvers and custom GPU kernels: 5–10× faster Python workflows and 50–100× in fully GPU-native iterative simulations.",
      sim: ["CuPy", "CUDA kernels"],
      lab: [],
      image: "",
      url: ""
    },
    {
      title: "Cell and hydrogel tracking",
      summary: "Automated microscopy video pipeline that detects cell clusters and tracks hydrogel deformation.",
      sim: ["MATLAB"],
      lab: ["microscopy", "image processing"],
      image: "",
      url: ""
    },
    {
      title: "Micro-heat sink optimization",
      summary: "Conjugate heat transfer models with response-surface and genetic-algorithm optimization, cutting thermal resistance by 15%.",
      sim: ["ANSYS Fluent", "MATLAB", "GA"],
      lab: [],
      image: "",
      url: ""
    }
  ],

  // ---------------------------------------------------------------
  //  Papers
  // ---------------------------------------------------------------
  papers: [
        
    {
      title: "Macroscopic convective fluid flows arising from binding of ions and small molecules to proteins",
      venue: "Small (Wiley)",
      year: "2026",
      authors: "", // e.g. "A. Heydari, S. Shrestha, J. Song, A. Sen, I. Aronson" in the published order
      url: "https://doi.org/10.1002/smll.202514985" // paste the paper's DOI link here
    },
    {
      title: "Optimized heat transfer systems: Exploring the synergy of micro pin-fins and micro Vortex           generators",
      venue: "International Communications in Heat and Mass Transfer",
      year: "2024",
      authors: "",
      url: "https://doi.org/10.1016/j.icheatmasstransfer.2024.107378" // paste the paper's DOI link here
    },
    
    {
      title: "A novel microfluidic device with parallel channels for sperm separation using spermatozoa intrinsic behaviors",
      venue: "Scientific Reports",
      year: "2023",
      authors: "",
      url: "https://doi.org/10.1038/s41598-023-28315-7" // paste the paper's DOI link here
    }
    
  ],

  // ---------------------------------------------------------------
  //  My journey: the timeline. Each group gets a header and cards.
  //  color: "lime", "amber", "violet" or "coral"
  //  icon:  "flask", "teach", "school" or "award"
  // ---------------------------------------------------------------
  journey: [
    {
      group: "Research and industry",
      color: "lime",
      icon: "flask",
      items: [
        { years: "2023 – now", title: "PhD researcher", org: "Penn State · Active Biomaterials Lab", tags: ["sim", "lab"] },
        { years: "2026", title: "Medical innovation and invention intern", org: "FluidQ LLC · microfluidics design and modeling", tags: ["sim", "lab"] },
        { years: "2021 – 2023", title: "CFD engineer", org: "MehR CFD LLC · 150+ client projects", tags: ["sim"] },
        { years: "2020 – 2021", title: "CFD engineer", org: "Tosan Group", tags: ["sim"] },
        { years: "2019 – 2021", title: "Research assistant", org: "TMU · ASMS Lab", tags: ["sim", "lab"] }
      ]
    },
    {
      group: "Teaching",
      color: "amber",
      icon: "teach",
      items: [
        { years: "2024 – now", title: "Numerical simulations in biomedical engineering", org: "Teaching assistant · Penn State", tags: [] },
        { years: "2019 – 2020", title: "Engineering mathematics, measurement systems, IC engines", org: "Teaching assistant · TMU", tags: [] }
      ]
    },
    {
      group: "Education",
      color: "violet",
      icon: "school",
      items: [
        { years: "2023 – 2028", title: "PhD, Biomedical Engineering", org: "The Pennsylvania State University", tags: [] },
        { years: "2018 – 2021", title: "MSc, Mechanical Engineering (thermo-fluids)", org: "Tarbiat Modares University", tags: [] },
        { years: "2014 – 2018", title: "BSc, Mechanical Engineering", org: "Isfahan University of Technology", tags: [] }
      ]
    },
    {
      group: "Honors",
      color: "coral",
      icon: "award",
      items: [
        { years: "2026", title: "Leighton Riess Graduate Scholarship", org: "Penn State College of Engineering", tags: [] },
        { years: "2020", title: "2nd place, COVID-19 hackathon", org: "TMU · lung-on-chip concept", tags: [] },
        { years: "2019", title: "1st and 3rd place, National Fluid Dynamics Competition", org: "Water cooling and atmospheric water harvesting", tags: [] },
        { years: "2019", title: "M. Nejad Fellowship", org: "Research productivity award", tags: [] },
        { years: "2018", title: "2nd place, National Biotechnology Congress", org: "Sperm-selection microchip idea", tags: [] }
      ]
    }
  ]
};
