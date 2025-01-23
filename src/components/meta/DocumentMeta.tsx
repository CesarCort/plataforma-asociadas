import { useEffect } from 'react'

interface DocumentMetaProps {
  title: string
  description?: string
  isPublicPage?: boolean
}

const BASE_TITLE = 'WIM PERÚ'
const BASE_DESCRIPTION = 'Plataforma de Women in Mining Perú - Empoderando a mujeres en la industria minera.'

export function DocumentMeta({ title, description, isPublicPage = false }: DocumentMetaProps) {
  useEffect(() => {
    // Actualizar título
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE

    // Actualizar metadatos
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description || BASE_DESCRIPTION)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description || BASE_DESCRIPTION
      document.head.appendChild(meta)
    }

    // Solo agregar etiquetas og en páginas públicas
    if (isPublicPage) {
      const ogTags = [
        { property: 'og:title', content: title ? `${title} | ${BASE_TITLE}` : BASE_TITLE },
        { property: 'og:description', content: description || BASE_DESCRIPTION },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: BASE_TITLE },
        { property: 'og:locale', content: 'es_PE' }
      ]

      ogTags.forEach(({ property, content }) => {
        let meta = document.querySelector(`meta[property="${property}"]`)
        if (meta) {
          meta.setAttribute('content', content)
        } else {
          meta = document.createElement('meta')
          meta.setAttribute('property', property)
          meta.setAttribute('content', content)
          document.head.appendChild(meta)
        }
      })
    }

    // Limpieza al desmontar
    return () => {
      document.title = BASE_TITLE
    }
  }, [title, description, isPublicPage])

  return null
} 