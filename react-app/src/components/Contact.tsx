import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'info',
    creneau: '',
    date: '',
    message: '',
    captcha: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [captchaQuestion, setCaptchaQuestion] = useState({ num1: 0, num2: 0, answer: 0 });
  const [dateScrollIndex, setDateScrollIndex] = useState(0);

  // Générer une question captcha au chargement et pré-remplir depuis URL
  React.useEffect(() => {
    generateCaptcha();
    
    // Pré-remplir le formulaire depuis les paramètres URL
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const creneau = urlParams.get('creneau');
    const message = urlParams.get('message');
    
    if (type || creneau || message) {
      setFormData(prev => ({
        ...prev,
        type: type || prev.type,
        creneau: creneau || prev.creneau,
        message: message ? decodeURIComponent(message) : prev.message
      }));
    }
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion({ num1, num2, answer: num1 + num2 });
  };

  const email = 'ultimate.begles@gmail.com';

  const creneaux = [
    { value: 'lundi-19h30', label: 'Lundi 19h30 - Loisirs (Haut Verduc)' },
    { value: 'mardi-18h', label: 'Mardi 18h - U17-U20 (Haut Verduc)' },
    { value: 'samedi-10h', label: 'Samedi 10h - U10-U13-U15 (Stade Duhourquet)' }
  ];

  // Obtenir le jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
  const getDayOfWeekFromCreneau = (creneauValue: string): number => {
    if (creneauValue.startsWith('lundi')) return 1;
    if (creneauValue.startsWith('mardi')) return 2;
    if (creneauValue.startsWith('samedi')) return 6;
    return -1;
  };

  // Vérifier si une date correspond au jour du créneau
  const isDateValidForCreneau = (date: string, creneauValue: string): boolean => {
    if (!date || !creneauValue) return true;
    const selectedDate = new Date(date + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay();
    const expectedDay = getDayOfWeekFromCreneau(creneauValue);
    return dayOfWeek === expectedDay;
  };

  // Générer les 8 prochaines dates correspondant au jour du créneau
  const getNextDatesForCreneau = (creneauValue: string): Date[] => {
    const dates: Date[] = [];
    const targetDay = getDayOfWeekFromCreneau(creneauValue);
    if (targetDay === -1) return dates;

    const today = new Date();
    let currentDate = new Date(today);
    
    // Trouver la première occurrence du jour cible
    while (currentDate.getDay() !== targetDay) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Générer les 8 prochaines occurrences
    for (let i = 0; i < 8; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }
    
    return dates;
  };

  // Formater une date pour l'affichage
  const formatDateDisplay = (date: Date): { day: string; month: string; date: string } => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    return {
      day: days[date.getDay()],
      month: months[date.getMonth()],
      date: date.getDate().toString()
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Si on change le créneau, réinitialiser la date si elle ne correspond pas
    if (name === 'creneau') {
      const currentDate = formData.date;
      setDateScrollIndex(0); // Réinitialiser l'index de scroll
      if (currentDate && !isDateValidForCreneau(currentDate, value)) {
        setFormData({
          ...formData,
          creneau: value,
          date: ''
        });
        return;
      }
    }
    
    // Si on change la date, vérifier qu'elle correspond au créneau
    if (name === 'date' && formData.creneau) {
      if (!isDateValidForCreneau(value, formData.creneau)) {
        // Ne pas mettre à jour si la date ne correspond pas au jour du créneau
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier le captcha
    if (!formData.captcha || parseInt(formData.captcha) !== captchaQuestion.answer) {
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus('idle');
        generateCaptcha();
        setFormData({ ...formData, captcha: '' });
      }, 3000);
      return;
    }
    
    // Générer ID unique basé sur la date et l'heure
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const idDemande = `${year}${month}${day}${hour}${minute}`;

    // Construction du message
    const subject = formData.type === 'test' 
      ? `Demande d'essai - ${formData.name} - ${idDemande}` 
      : `Demande de renseignements - ${formData.name} - ${idDemande}`;
    
    let message = `---\n`;
    message += `**${subject}**\n\n`;
    message += `**Nom :** ${formData.name}\n`;
    message += `**Email :** ${formData.email}\n`;
    message += `**Téléphone :** ${formData.phone || 'Non renseigné'}\n`;
    message += `**Type de demande :** ${formData.type === 'test' ? 'Essai gratuit' : 'Demande de renseignements'}\n`;
    
    if (formData.type === 'test' && formData.creneau) {
      const selectedCreneau = creneaux.find(c => c.value === formData.creneau);
      message += `**Créneau souhaité :** ${selectedCreneau?.label}\n`;
    }
    
    if (formData.type === 'test' && formData.date) {
      message += `**Date souhaitée :** ${formData.date}\n`;
    }
    
    message += `\n**Message :**\n${formData.message}\n`;
    message += `---`;
    
    const topicName = formData.type === 'test' ? 'Demande d\'essai' : 'Demande de renseignements';
    const fullTopic = `${topicName}`;

    try {
      // Envoi vers Zulip
      const response = await fetch('https://ultimatebegles.zulipchat.com/api/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('website-contact-bot@ultimatebegles.zulipchat.com:sUcfv8gYdGbi9Uiv9uUg3sTKatwFwadk'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          type: 'stream',
          to: 'CanalDeTest_NePasSupprimerSVP',
          topic: fullTopic,
          content: message
        })
      });

      if (response.ok) {
        setFormStatus('success');
        // Nettoyer l'URL des paramètres
        window.history.replaceState({}, '', '/#contact');
        setTimeout(() => {
          setFormStatus('idle');
          setFormData({
            name: '',
            email: '',
            phone: '',
            type: 'info',
            creneau: '',
            date: '',
            message: '',
            captcha: ''
          });
          generateCaptcha();
        }, 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => {
          setFormStatus('idle');
          generateCaptcha();
          setFormData({ ...formData, captcha: '' });
        }, 5000);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus('idle');
        generateCaptcha();
        setFormData({ ...formData, captcha: '' });
      }, 5000);
    }
  };

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Afficher l'email de manière obfusquée pour les robots
  const displayEmail = () => {
    const parts = email.split('@');
    return (
      <>
        {parts[0]}
        <span style={{ display: 'none' }}>null</span>
        @
        <span style={{ display: 'none' }}>null</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section id="contact" className="section bg-gray-50" data-reveal>
      <div className="container">
        <h2 className="text-3xl font-bold mb-6 text-center text-secondary">Restons en contact</h2>
        
        <div className="max-w-5xl mx-auto">
          <p className="text-gray-600 mb-8 text-lg leading-relaxed text-center">
            Vous avez une question, une demande d'information ou envie de nous rejoindre ?
          </p>

          {/* Formulaire de contact */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8 relative">
            {/* Notification flottante */}
            {formStatus === 'success' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl animate-slide-in flex items-center gap-3 w-11/12 md:w-auto">
                <i className="fas fa-check-circle text-2xl"></i>
                <div>
                  <p className="font-semibold">Message envoyé !</p>
                  <p className="text-sm">Nous vous répondrons rapidement.</p>
                </div>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl animate-slide-in flex items-center gap-3 w-11/12 md:w-auto">
                <i className="fas fa-exclamation-circle text-2xl"></i>
                <div>
                  <p className="font-semibold">Erreur d'envoi</p>
                  <p className="text-sm">Veuillez réessayer ou nous contacter directement.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="jean.dupont@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                    Type de demande <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="info">Demande de renseignements</option>
                    <option value="test">Essai gratuit</option>
                  </select>
                </div>
              </div>

              {formData.type === 'test' && (
                <>
                  <div className="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0">
                    <div>
                      <label htmlFor="creneau" className="block text-sm font-semibold text-gray-700 mb-2">
                        Créneau souhaité <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="creneau"
                        name="creneau"
                        value={formData.creneau}
                        onChange={handleChange}
                        required={formData.type === 'test'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionnez un créneau</option>
                        {creneaux.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date souhaitée pour l'essai <span className="text-red-500">*</span>
                      </label>
                      {formData.creneau ? (
                        <div className="relative flex items-center gap-1 sm:gap-2">
                          <button
                            type="button"
                            onClick={() => setDateScrollIndex(Math.max(0, dateScrollIndex - 1))}
                            disabled={dateScrollIndex === 0}
                            className="flex-shrink-0 w-8 sm:w-10 h-[42px] rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition"
                          >
                            <i className="fas fa-chevron-left text-gray-600 text-sm"></i>
                          </button>
                          
                          <div className="flex-1 overflow-hidden">
                            <div className="flex gap-1 sm:gap-2 transition-transform duration-300" style={{ transform: `translateX(-${dateScrollIndex * (window.innerWidth < 640 ? 60 : 72)}px)` }}>
                              {getNextDatesForCreneau(formData.creneau).map((date) => {
                                const dateStr = date.toISOString().split('T')[0];
                                const display = formatDateDisplay(date);
                                const isSelected = formData.date === dateStr;
                                return (
                                  <button
                                    key={dateStr}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, date: dateStr })}
                                    className={`flex-shrink-0 w-14 sm:w-16 h-[42px] rounded-lg border-2 flex flex-col items-center justify-center transition text-xs ${
                                      isSelected
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-gray-300 bg-white hover:border-primary hover:bg-gray-50'
                                    }`}
                                  >
                                    <div className="font-semibold text-[10px] sm:text-xs">{display.day} {display.date}</div>
                                    <div className="text-[10px] sm:text-xs">{display.month}</div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => setDateScrollIndex(dateScrollIndex + 1)}
                            disabled={dateScrollIndex >= getNextDatesForCreneau(formData.creneau).length - (window.innerWidth < 640 ? 2 : 3)}
                            className="flex-shrink-0 w-8 sm:w-10 h-[42px] rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition"
                          >
                            <i className="fas fa-chevron-right text-gray-600 text-sm"></i>
                          </button>
                        </div>
                      ) : (
                        <div className="h-[42px] flex items-center">
                          <p className="text-sm text-gray-500 italic">Sélectionnez d'abord un créneau</p>
                        </div>
                      )}
                      <input
                        type="hidden"
                        name="date"
                        value={formData.date}
                        required={formData.type === 'test'}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Votre message..."
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <div className="flex-1">
                  <label htmlFor="captcha" className="block text-sm font-semibold text-gray-700 mb-2">
                    Vérification anti-spam <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg">
                      {captchaQuestion.num1} + {captchaQuestion.num2} = ?
                    </div>
                    <input
                      type="number"
                      id="captcha"
                      name="captcha"
                      value={formData.captcha}
                      onChange={handleChange}
                      required
                      className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="?"
                    />
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <button
                    type="submit"
                    disabled={formStatus === 'success'}
                    className={`px-8 py-3 text-lg font-semibold rounded-md shadow transition ${
                      formStatus === 'success' 
                        ? 'bg-green-500 text-white cursor-not-allowed' 
                        : formStatus === 'error'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-primary text-white hover:bg-secondary'
                    }`}
                  >
                    {formStatus === 'success' ? (
                      <>
                        <i className="fas fa-check-circle mr-2"></i>
                        Message envoyé !
                      </>
                    ) : formStatus === 'error' ? (
                      <>
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        Erreur - Réessayer
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Envoyer
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Autres moyens de contact */}
          <p className="text-center text-gray-600 mb-4 font-semibold">Ou contactez-nous directement :</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                <i className="fas fa-envelope text-white text-2xl"></i>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800 text-lg mb-2">Email</div>
                <a href="#" onClick={copyEmail} className="text-blue-500 text-sm hover:underline cursor-pointer">
                  {copied ? 'Email copié !' : displayEmail()}
                </a>
              </div>
            </div>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/aiglesdebegles" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition hover:shadow-xl hover:-translate-y-1 text-inherit no-underline"
            >
              <div className="w-16 h-16 rounded-full bg-[#4267B2] flex items-center justify-center mb-4">
                <i className="fab fa-facebook-f text-white text-2xl"></i>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800 text-lg mb-2">Facebook</div>
                <div className="text-gray-600 text-sm">/aiglesdebegles</div>
              </div>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/aigles_de_begles/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition hover:shadow-xl hover:-translate-y-1 text-inherit no-underline"
            >
              <div className="w-16 h-16 rounded-full bg-[#E4405F] flex items-center justify-center mb-4">
                <i className="fab fa-instagram text-white text-2xl"></i>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800 text-lg mb-2">Instagram</div>
                <div className="text-gray-600 text-sm">@aigles_de_begles</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
