export interface Adapter<T = unknown> {
  read(): Promise<T>
  write(data: T): Promise<void>
}
