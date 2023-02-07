export function getProfession(portfession: string): string {
  switch (portfession) {
    case 'actor':
      return 'Актёр';
    case 'composer':
      return 'Композитор';
    case 'designer':
      return 'Дизайнер';
    case 'director':
      return 'Директор';
    case 'editor':
      return 'Редактор';
    case 'operator':
      return 'Оператор';
    case 'producer':
      return 'Продюсер';
    case 'voice_actor':
      return 'Озвучка';
    case 'writer':
      return 'Автор сценария';
    default:
      return 'Актёр';
  }
}
