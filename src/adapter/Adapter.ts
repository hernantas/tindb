export interface Adapter<T = unknown> {
  read(): Promise<T | undefined>
  write(data: T): Promise<void>
}
