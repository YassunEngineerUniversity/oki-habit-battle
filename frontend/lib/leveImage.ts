export const levelImage = (level: string) => {
  const digits = level.length

  switch (level) {
    case "SSS":
      return { imageUrl: "/images/level/level-sss.webp", digits };
    case "SS":
      return { imageUrl: "/images/level/level-ss.webp", digits };
    case "S":
      return { imageUrl: "/images/level/level-s.webp", digits };
    case "AAA":
      return { imageUrl: "/images/level/level-aaa.webp", digits };
    case "AA":
      return { imageUrl: "/images/level/level-aa.webp", digits };
    case "A":
      return { imageUrl: "/images/level/level-a.webp", digits };
    case "B":
      return { imageUrl: "/images/level/level-b.webp", digits };
    case "C":
      return { imageUrl: "/images/level/level-c.webp", digits };
    case "D":
      return { imageUrl: "/images/level/level-d.webp", digits };
    case "E":
      return { imageUrl: "/images/level/level-e.webp", digits };
    default:
      return { imageUrl: "", digits };
  }
}