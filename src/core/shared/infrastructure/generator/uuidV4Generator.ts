import type { UuidGenerator } from '@/core/shared/domain/generator/uuidGenerator'
import { v4 as uuidv4 } from 'uuid';

export const uuidV4Generator = (): UuidGenerator => {
  const generate = () => {
    return uuidv4()
  }

  return {
    generate
  }
}