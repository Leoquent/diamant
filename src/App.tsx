import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PhoneCall,
  Menu,
  X,
  Clock,
  ShieldCheck,
  Wrench,
  MapPin,
  ArrowRight,
  Info,
  CheckCircle,
  Gem,
  ChevronDown,
  DoorOpen,
  Car,
  Lock,
  Shield
} from 'lucide-react'

const services = [
  {
    id: 'tueroeffnung',
    title: 'Türöffnung',
    materialIcon: 'door_front',
    icon: <DoorOpen />,
    desc: 'Wir öffnen Haus- und Wohnungstüren – schnell, sauber und zu 99% ohne jede Beschädigung.',
    details: [
      'Sie stehen vor verschlossener Tür – ob zugefallen oder den Schlüssel verloren: Unser geschultes Team ist in 15 bis 30 Minuten bei Ihnen in Düsseldorf.',
      'Wir arbeiten mit speziellem Feinwerkzeug, das die gängigsten Schlosstypen öffnet, ohne Schäden an Tür, Rahmen oder Zylinder zu hinterlassen. So sparen Sie sich teure Folgereparaturen.',
      'Erst wenn eine schadenfreie Öffnung technisch nicht möglich ist, besprechen wir mit Ihnen das weitere Vorgehen – transparent und ohne Überraschungen. Selbstverständlich übernehmen wir auf Wunsch auch den sofortigen Austausch des Zylinders vor Ort.'
    ],
    bullets: ['99% schadenfreie Öffnung', 'Einsatz in 15–30 Min.', 'Alle gängigen Schlosstypen', 'Festpreis vorab am Telefon']
  },
  {
    id: 'autooeffnung',
    title: 'Autoöffnung',
    materialIcon: 'directions_car',
    icon: <Car />,
    desc: 'Schlüssel im Auto eingeschlossen? Wir öffnen Fahrzeuge aller Marken – ohne Lack- oder Schlossschäden.',
    details: [
      'Autoschlüssel vergessen, verloren oder im Fahrzeug eingeschlossen – das passiert schneller als man denkt. Unser mobiler Dienst kommt direkt zu Ihrem Standort, egal ob Parkplatz, Tiefgarage oder Straßenrand.',
      'Mit speziellen Öffnungswerkzeugen für die Automobiltechnik arbeiten wir schonend an Türdichtungen und Schließmechanismen, ohne Kratzer am Lack oder Schäden an der Elektronik zu verursachen.',
      'Wir sind erfahren mit allen gängigen Marken – von VW und BMW über Mercedes bis hin zu Audi, Opel und Ford. Auch bei neueren Modellen mit elektronischer Verriegelung finden wir die richtige Lösung.'
    ],
    bullets: ['Alle Fahrzeugmarken', 'Keinerlei Lackschäden', 'Mobiler Einsatz vor Ort', 'Auch elektronische Schlösser']
  },
  {
    id: 'tresoroeffnung',
    title: 'Tresoröffnung',
    materialIcon: 'safety_check',
    icon: <Lock />,
    desc: 'Diskrete und professionelle Öffnung von Tresoren, Geldschränken und Safes – alle Marken und Generationen.',
    details: [
      'Ein Tresor schützt Ihre Wertsachen, Dokumente und Bargeld. Ob freistehender Panzerschrank, Wandtresor oder Möbelsafe – wenn er sich nicht mehr öffnen lässt, brauchen Sie einen Experten mit der richtigen Ausrüstung.',
      'Tresore werden in der Regel für Jahrzehnte angeschafft. Entsprechend vielfältig sind die Marken, Modelle und Schlossgenerationen auf dem Markt. Unser Team ist auf genau diese Vielfalt spezialisiert und beherrscht Öffnungstechniken für mechanische wie elektronische Systeme.',
      'Je nach Tresortyp setzen wir spezialisierte Technik ein: Öffnungscomputer, lasergesteuerte Messtechnik, Präzisionsbohrgeräte oder individuell angefertigte Bohrschablonen. Auch das Entschlüsseln und Nachsperren mechanischer Tresorschlösser gehört zu unserem Leistungsspektrum.'
    ],
    bullets: ['Alle Marken & Generationen', 'Mechanische & elektronische Schlösser', 'Spezialwerkzeug & Messtechnik', 'Diskret und vertraulich']
  },
  {
    id: 'einbruchschutz',
    title: 'Einbruchschutz',
    materialIcon: 'security',
    icon: <Shield />,
    desc: 'Soforthilfe nach Einbruch und professionelle Sicherheitsberatung – damit es nicht wieder passiert.',
    details: [
      'Ein Einbruch in die eigene Wohnung ist mehr als ein materieller Verlust – der Eingriff in die Privatsphäre hinterlässt oft tiefe Spuren. Wenn Türen und Fenster beschädigt sind, brauchen Sie sofort professionelle Hilfe. Wir sichern Ihre Wohnung noch in der Nacht und sorgen dafür, dass Sie sich wieder sicher fühlen.',
      'Nach der Notfallsicherung kümmern wir uns um die fachgerechte Reparatur beschädigter Schlösser, Beschläge und Türkonstruktionen. Dabei achten wir auf faire Preisgestaltung und besprechen alle Kosten transparent mit Ihnen, bevor wir mit der Arbeit beginnen.',
      'Damit es gar nicht erst so weit kommt: Wir beraten Sie zum mechanischen Grundschutz Ihrer Türen – von stabilen Schutzbeschlägen mit Ziehschutz über hochwertige Sicherheitszylinder bis hin zu Panzerriegelschlössern. Durch fachgerechte Montage zusätzlicher Sicherheitstechnik schützen Sie Ihr Zuhause wirksam vor ungebetenen Gästen.'
    ],
    bullets: ['Soforthilfe nach Einbruch', 'Schloss- & Türreparatur', 'Panzerriegel & Schutzbeschläge', 'Individuelle Sicherheitsberatung']
  }
]

import logo from './assets/logo.png'
import expertImg from './assets/expert.png'
import mapImg from './assets/duesseldorfkarte.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-xl shadow-primary/30 border-4 border-white"
          href="tel:021194256907"
        >
          <span className="material-symbols-outlined text-3xl">call</span>
        </motion.a>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'glass-effect border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-36">
            <div className="flex items-center">
              <img
                className="h-24 w-auto"
                src={logo}
                alt="Schlüsseldienst Diamant Logo"
              />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#leistungen" className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">Leistungen</a>
              <a href="#preise" className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">Preise</a>
              <a href="#über-uns" className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">Über uns</a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md shadow-primary/20"
                href="tel:021194256907"
              >
                <PhoneCall size={18} />
                0211 94256907
              </motion.a>
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-text-main cursor-pointer hover:text-primary transition-colors duration-200" aria-label="Menü öffnen">
                {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#leistungen" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold text-gray-600">Leistungen</a>
                <a href="#preise" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold text-gray-600">Preise</a>
                <a href="#über-uns" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold text-gray-600">Über uns</a>
                <a href="tel:021194256907" className="flex items-center gap-2 bg-primary text-white p-4 rounded-xl font-bold">
                  <PhoneCall size={20} />
                  Jetzt anrufen: 0211 94256907
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-pattern">
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600">24/7 Notdienst in Düsseldorf</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight" style={{ color: '#4F504B' }}>
              Tür zu?<br />
              <span>Wir sind in <span className="text-primary italic">15-30 Min.</span> bei Ihnen!</span>
            </h1>

            <p className="text-xl text-secondary mb-10 leading-relaxed max-w-2xl font-medium">
              Ihr zuverlässiger Schlüsseldienst in Düsseldorf. Schnell, schadenfrei und transparent. Inhabergeführt & vertrauenswürdig.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(222, 171, 19, 0.4)" }}
                className="flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 transition-all"
                href="tel:021194256907"
              >
                <PhoneCall />
                JETZT ANRUFEN
              </motion.a>
              <a
                className="flex items-center justify-center gap-3 bg-white text-text-main border border-gray-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all shadow-sm"
                href="#preise"
              >
                Preise ansehen
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FeatureBadge icon={<Clock />} title="24/7 Service" subtitle="Tag & Nacht bereit" />
            <FeatureBadge icon={<ShieldCheck />} title="Festpreisgarantie" subtitle="Keine Abzocke" />
            <FeatureBadge icon={<Wrench />} title="Ohne Schäden" subtitle="Profi-Werkzeuge" />
            <FeatureBadge icon={<MapPin />} title="Inhabergeführt" subtitle="Direkter Experte" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 relative overflow-hidden bg-background-offset scroll-mt-40" id="leistungen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Unsere Experten-Leistungen</h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
            <p className="mt-6 text-secondary max-w-2xl mx-auto text-lg">Professionelle Sicherheitslösungen für Privat- und Gewerbekunden in Düsseldorf.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                materialIcon={s.materialIcon}
                onDetails={() => setSelectedService(s)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      {/* Prices */}
      <section className="py-24 bg-white scroll-mt-40" id="preise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-extrabold mb-6">Transparent & Ehrlich. <br /><span className="text-primary">Keine versteckten Kosten.</span></h2>
              <p className="text-secondary text-lg mb-8">Wir setzen auf faire Preisgestaltung. Bei uns erfahren Sie den Preis, bevor wir mit der Arbeit beginnen. Inklusive Anfahrt in ganz Düsseldorf.</p>

              <div className="bg-background-offset border-l-4 border-primary p-6 rounded-r-xl mb-10">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Info className="text-primary" size={20} />
                  Transparente Preiskalkulation
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ihr Experte ermittelt den genauen Preis individuell im Telefonat. Dieser basiert auf dem spezifischen Arbeitsaufwand, der Anfahrtspauschale und dem jeweiligen Zeitpunkt des Einsatzes.
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  Anfahrtspauschale nur 25€ (Düsseldorf weit)
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  Zahlung bequem per EC-Karte oder Bar
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  Zerstörungsfreie Öffnung als oberstes Ziel
                </li>
              </ul>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1.5 font-bold text-xs uppercase tracking-widest rounded-bl-xl">Preise</div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-4 font-extrabold text-sm uppercase text-gray-400">Leistung</th>
                      <th className="py-4 font-extrabold text-sm uppercase text-gray-400 text-right">Ab</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <PriceRow label="Türöffnung (Mo-Fr, 08-18 Uhr)" price="39€" />
                    <PriceRow label="Autoöffnung (Standard)" price="89€" />
                    <PriceRow label="Zylinderwechsel (inkl. 3 Schlüssel)" price="79€" />
                    <PriceRow label="Notdienst-Zuschlag (Nacht/Feiertag)" price="ab 30€" />
                  </tbody>
                </table>
                <p className="mt-8 text-xs text-gray-400 italic leading-relaxed text-center">Alle Preise verstehen sich zzgl. Material und Anfahrt. Verbindliches Angebot erfolgt vor Ort nach Besichtigung.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-background-offset scroll-mt-40" id="über-uns">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <img
                className="rounded-2xl shadow-xl relative z-10 w-full h-[500px] object-cover"
                src={expertImg}
                alt="Expert"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl z-20 border-t-4 border-primary">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-black text-primary">10+</div>
                  <div className="text-sm font-bold uppercase leading-tight">Jahre Erfahrung<br />in Düsseldorf</div>
                </div>
              </div>
            </div>

            <div className="lg:pl-8">
              <h2 className="text-4xl font-extrabold mb-8 leading-tight">Warum Schlüsseldienst <span className="text-primary italic">Diamant</span>?</h2>
              <div className="space-y-10">
                <AboutItem
                  icon={<Gem className="text-primary" />}
                  title="Präzision & Qualität"
                  text="Wie ein Diamant stehen wir für Härte gegen Einbrecher und Feinheit bei der Öffnung Ihrer Türen. Wir nutzen nur hochwertiges Werkzeug."
                />
                <AboutItem
                  icon={<MapPin className="text-primary" />}
                  title="Lokal verwurzelt"
                  text="Wir sind kein Callcenter. Wir sind echte Düsseldorfer und kennen jeden Stadtteil von Oberkassel bis Gerresheim aus dem Effeff."
                />
                <AboutItem
                  icon={<PhoneCall className="text-primary" />}
                  title="Direkter Kontakt"
                  text="Keine Warteschleifen. Wenn Sie anrufen, sprechen Sie direkt mit dem Techniker, der auch zu Ihnen kommt."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 bg-background-offset" id="bewertungen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              {/* Google G logo */}
              <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: '#4F504B' }}>Google Bewertungen</h2>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl font-black text-primary">5,0</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className="w-6 h-6 text-primary fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-secondary font-medium">(150 Bewertungen)</span>
            </div>
            <p className="text-secondary">Verifiziert auf Google Maps · Düsseldorf</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Jiena Viduka', time: 'vor 4 Monaten', stars: 5, text: 'Absolut freundlicher und schneller Schlüsseldienst. Transparenz beim Preis direkt am Telefon & dieser war mehr als fair, dafür, dass ich innerhalb 15 Minuten jemanden bei mir hatte der die Tür problemlos öffnen konnte.' },
              { name: 'luna moon', time: 'vor 6 Monaten', stars: 5, text: 'Top Schlüsseldienst alleine am Telefon bereits mir eine Preisvorstellung genannt die mehr als angebracht ist für die Dienste. Keine Anfahrtspauschale, wie es sonst fast jeder nimmt. Der Herr war auf die Minute pünktlich und hat echt super Arbeit geleistet.' },
              { name: 'Mohammed Jaber', time: 'vor 4 Monaten', stars: 5, text: 'Sehr guter und schneller zuverlässiger Service zum Fairen Preis. Absolute Weiterempfehlung. Düsseldorf Rath' },
              { name: 'Chari', time: 'vor 11 Monaten', stars: 5, text: 'Top Service. Sehr kompetent und Schnell war nach 10 Minuten schon da obwohl gesagt wurde 20 Minuten dauerts. Ali hatte die Tür in Null Komma nichts offen und war sehr nett dabei. Dafür dass es schon Abends war lobenswert. Alles in allem Top Firma' },
              { name: 'Julian Brassel', time: 'vor 8 Monaten', stars: 5, text: 'Sensationeller Service! Mieter hatte Problem mit der Wohnungstür. 49 Minuten nach dem Erstgespräch wurden wie Schlösser ausgetauscht und der Schaden behoben. Preis absolut fair!' },
              { name: 'Enrico Correia Lé', time: 'vor einem Jahr', stars: 5, text: 'Schnell und Freundlich! und dabei noch günstiger als die Mitbewerber. Der Mitarbeiter „Ali" kam nach 10 Minuten schon an und konnte mir sofort helfen. Dabei war er sehr freundlich und Respektvoll.' },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm flex-shrink-0">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#4F504B' }}>{review.name}</p>
                      <p className="text-xs text-secondary">{review.time}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#4F504B', opacity: 0.85 }}>{review.text}</p>
              </motion.div>
            ))}

          </div>

          <div className="text-center mt-10">
            <a
              href="https://www.google.com/maps/search/Schl%C3%BCsseldienst+Diamant+D%C3%BCsseldorf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-200 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white transition-colors duration-200 cursor-pointer" style={{ color: '#4F504B' }}
            >
              Alle Bewertungen auf Google ansehen
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-12">Häufig gestellte Fragen</h2>
          <div className="space-y-4">
            <AccordionItem
              question="Wie lange dauert es, bis Sie vor Ort sind?"
              answer="In der Regel erreichen wir jeden Punkt in Düsseldorf innerhalb von 15 bis 30 Minuten, abhängig von der aktuellen Verkehrslage."
              isOpen={true}
            />
            <AccordionItem
              question="Wird meine Tür beim Öffnen beschädigt?"
              answer="Bei nur zugefallenen Türen liegt unsere Erfolgsquote für eine schadenfreie Öffnung bei fast 100%. Bei abgeschlossenen Türen müssen wir den Zylinder meist bohren, schützen aber den Beschlag."
            />
            <AccordionItem
              question="Welche Zahlungsmethoden akzeptieren Sie?"
              answer="Sie können bei uns ganz bequem bar oder mit EC-Karte zahlen. Sie erhalten selbstverständlich eine ordentliche Rechnung für Ihre Unterlagen oder die Versicherung."
            />
            <AccordionItem
              question="Was kostet die Türöffnung?"
              answer="Eine Türöffnung bei einer zugefallenen Tür beginnt ab 39€ (Mo–Fr, 08–18 Uhr). Den genauen Preis nennen wir Ihnen bereits am Telefon – transparent und verbindlich. So wissen Sie vor unserem Einsatz genau, was auf Sie zukommt. Zuschläge für Nacht-, Wochenend- oder Feiertagseinsätze werden ebenfalls vorab kommuniziert."
            />
            <AccordionItem
              question="Sind Sie 24 Stunden erreichbar?"
              answer="Vollständig, inklusive Nächte, Wochenenden und Feiertage – Notdienst garantiert."
            />
            <AccordionItem
              question="Welche Unterlagen brauche ich?"
              answer="Ausweisdokument (z. B. Personalausweis) mit Adresse oder Nachweis des Wohnrechts für den Einsatz."
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-background-offset relative">
        <div className="diamond-pattern absolute inset-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row border border-gray-100">
            <div className="lg:w-1/2 p-12">
              <h2 className="text-3xl font-extrabold mb-6">Kontaktieren Sie uns</h2>
              <p className="text-secondary mb-8">Haben Sie Fragen zu Einbruchschutz oder benötigen Sie eine Beratung? Schreiben Sie uns.</p>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input className="w-full bg-background-offset border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Name" type="text" />
                  <input className="w-full bg-background-offset border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Telefon" type="tel" />
                </div>
                <input className="w-full bg-background-offset border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="E-Mail Adresse" type="email" />
                <textarea className="w-full bg-background-offset border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Ihre Nachricht" rows={4}></textarea>
                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                  NACHRICHT SENDEN
                </button>
              </form>
            </div>
            <div className="lg:w-1/2 min-h-[400px] relative bg-gray-100">
              <img
                className="w-full h-full object-cover"
                src={mapImg}
                alt="Einsatzgebiet Düsseldorf"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-100">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin className="text-primary" />
                  </div>
                  <span className="font-bold">Einsatzgebiet: Ganz Düsseldorf</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img className="h-20 w-auto" src={logo} alt="Logo" />
              </div>
              <p className="max-w-md leading-relaxed text-secondary mb-6">Ihr Fachbetrieb für Sicherheitstechnik und Schlüssel-Notdienst in Düsseldorf. Wir sind 24 Stunden am Tag, 365 Tage im Jahr für Sie im Einsatz.</p>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/SD-Diamant-112245417769253/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://www.instagram.com/sd_diamant/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/82250480/admin/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="mailto:info@schluesseldienst-diamant.de" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200" aria-label="E-Mail">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
                <a href="tel:021194256907" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200" aria-label="Telefon">
                  <PhoneCall size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Links</h4>
              <ul className="space-y-4 text-sm text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Impressum</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Datenschutz</a></li>
                <li><a href="#preise" className="hover:text-primary transition-colors">Preise</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Notruf</h4>
              <a href="tel:021194256907" className="text-primary text-3xl font-black mb-2 block hover:opacity-80 transition-opacity">0211 94256907</a>
              <p className="text-xs uppercase tracking-widest text-secondary font-bold mb-4">24/7 Erreichbar</p>
              <a href="mailto:info@schluesseldienst-diamant.de" className="text-sm text-secondary hover:text-primary transition-colors">info@schluesseldienst-diamant.de</a>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary">
            <p>© 2025 Schlüsseldienst Diamant Düsseldorf. Alle Rechte vorbehalten.</p>
            <div className="flex gap-6 font-semibold">
              <span>Meisterbetrieb</span>
              <span>IHK Geprüft</span>
              <span>24h Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureBadge({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
  return (
    <div className="flex items-center gap-4 group cursor-default">
      <div className="w-14 h-14 rounded-full bg-background-offset flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
        <div className="scale-110">{icon}</div>
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-tight">{title}</p>
        <p className="text-xs text-secondary mt-0.5">{subtitle}</p>
      </div>
    </div>
  )
}

function ServiceCard({ icon, title, desc, materialIcon, onDetails }: { icon: any, title: string, desc: string, materialIcon?: string, onDetails: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl border border-transparent hover:border-primary/20 transition-all duration-200 group shadow-sm hover:shadow-xl cursor-default flex flex-col"
    >
      <div className="w-16 h-16 bg-background-offset rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
        {materialIcon ? <span className="material-symbols-outlined text-3xl">{materialIcon}</span> : <div className="scale-125">{icon}</div>}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-secondary text-sm leading-relaxed mb-6 flex-1">{desc}</p>
      <button
        onClick={onDetails}
        className="text-primary font-bold text-sm flex items-center gap-2 group/btn cursor-pointer bg-transparent border-none p-0"
      >
        Details <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  )
}

function ServiceModal({ service, onClose }: { service: typeof services[0] | null, onClose: () => void }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [service])

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            animate={{ backdropFilter: 'blur(8px)', opacity: 1 }}
            exit={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10"
          >
            {/* Gold accent bar at top */}
            <div className="h-1.5 bg-primary rounded-t-3xl" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Schließen"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">{service.materialIcon}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold" style={{ color: '#4F504B' }}>{service.title}</h3>
              </div>

              {/* Detail paragraphs */}
              <div className="space-y-4 mb-8">
                {service.details.map((p, i) => (
                  <p key={i} className="text-sm md:text-base leading-relaxed" style={{ color: '#4F504B', opacity: 0.85 }}>{p}</p>
                ))}
              </div>

              {/* Bullet points */}
              <div className="bg-background-offset rounded-2xl p-6 mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Auf einen Blick</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle size={16} className="text-primary flex-shrink-0" />
                      <span className="text-sm font-medium" style={{ color: '#4F504B' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href="tel:021194256907"
                className="flex items-center justify-center gap-3 bg-primary text-white w-full py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-colors cursor-pointer"
              >
                <PhoneCall size={20} />
                Jetzt anrufen: 0211 94256907
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


function PriceRow({ label, price }: { label: string, price: string }) {
  return (
    <tr>
      <td className="py-5 font-semibold">{label}</td>
      <td className="py-5 text-right font-black text-2xl text-primary">{price}</td>
    </tr>
  )
}

function AboutItem({ icon, title, text }: { icon: any, title: string, text: string }) {
  return (
    <div className="flex gap-6">
      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex-shrink-0 flex items-center justify-center border border-gray-100">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-secondary leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function AccordionItem({ question, answer, isOpen = false }: { question: string, answer: string, isOpen?: boolean }) {
  const [open, setOpen] = useState(isOpen)
  return (
    <div className="bg-background-offset rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <span className="font-bold text-lg text-left">{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-secondary">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
