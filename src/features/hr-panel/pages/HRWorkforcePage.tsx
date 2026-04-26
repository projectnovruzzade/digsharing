import { useQuery } from '@tanstack/react-query'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import * as XLSX from 'xlsx'
import { toast } from 'react-toastify'
import { Badge, Button, Card, Input, Progress } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { getEmployees } from '@/services/employee.service'
import type { Employee } from '@/types/employee.types'

const col = createColumnHelper<Employee>()

export default function HRWorkforcePage() {
  const [globalFilter, setGlobalFilter] = useState('')
  const debouncedFilter = globalFilter

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  })

  const columns = useMemo(
    () => [
      col.display({
        id: 'name',
        header: 'Name',
        cell: (ctx) => (
          <span className="font-medium text-fg">
            {ctx.row.original.firstName} {ctx.row.original.lastName}
          </span>
        ),
      }),
      col.accessor('company.name', { header: 'Company' }),
      col.accessor('department', { header: 'Department' }),
      col.accessor('position', { header: 'Position' }),
      col.display({
        id: 'skills',
        header: 'Top skills',
        cell: (ctx) => (
          <div className="flex flex-wrap gap-1">
            {ctx.row.original.skills.slice(0, 3).map((s) => (
              <Badge key={s.id} variant="primary" className="text-xs">
                {s.name}
              </Badge>
            ))}
          </div>
        ),
      }),
      col.display({
        id: 'workload',
        header: 'Workload',
        cell: (ctx) => (
          <div className="w-28">
            <Progress
              value={ctx.row.original.workloadPercent}
              barClassName={
                ctx.row.original.workloadPercent > 85
                  ? 'bg-danger'
                  : ctx.row.original.workloadPercent > 60
                    ? 'bg-warning'
                    : 'bg-accent-dark'
              }
            />
            <span className="text-xs text-fg-muted">
              {ctx.row.original.workloadPercent}%
            </span>
          </div>
        ),
      }),
      col.display({
        id: 'status',
        header: 'Status',
        cell: (ctx) => <Badge variant="muted">{ctx.row.original.status}</Badge>,
      }),
      col.accessor('performanceScore', {
        header: 'Perf.',
        cell: (ctx) => {
          const v = ctx.getValue()
          return (
            <span
              className={
                v >= 80
                  ? 'text-success'
                  : v >= 60
                    ? 'text-warning'
                    : 'text-danger'
              }
            >
              {v}
            </span>
          )
        },
      }),
    ],
    [],
  )

  const table = useReactTable({
    data: employees,
    columns,
    state: { globalFilter: debouncedFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const exportExcel = () => {
    const rows = table.getFilteredRowModel().rows.map((r) => {
      const e = r.original
      return {
        Name: `${e.firstName} ${e.lastName}`,
        Company: e.company.name,
        Department: e.department,
        Position: e.position,
        Workload: e.workloadPercent,
        Status: e.status,
        Performance: e.performanceScore,
      }
    })
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Workforce')
    XLSX.writeFile(wb, 'workforce-export.xlsx')
    toast.success('Exported current table view.')
  }

  return (
    <div>
      <PageHeader
        title="Workforce"
        description="Search, filter, and export the holding employee directory (mock data)."
        actions={
          <Button type="button" variant="secondary" onClick={exportExcel}>
            Export Excel
          </Button>
        }
      />

      <Card className="overflow-x-auto p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
          <Input
            placeholder="Search name, dept…"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-xs"
          />
        </div>
        {isLoading ? (
          <p className="p-4 text-sm text-fg-secondary">Loading…</p>
        ) : (
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-border bg-surface-2">
                  {hg.headers.map((h) => (
                    <th key={h.id} className="px-4 py-3 font-medium text-fg" scope="col">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={i % 2 === 0 ? 'bg-surface' : 'bg-surface-2/80'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-fg-secondary">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex items-center justify-between border-t border-border p-4 text-sm">
          <span className="text-fg-muted">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount() || 1}
          </span>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              type="button"
              size="sm"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Prev
            </Button>
            <Button
              variant="secondary"
              type="button"
              size="sm"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
