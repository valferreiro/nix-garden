
import uuid
from datetime import date, datetime, timezone

from sqlalchemy import Date, DateTime, ForeignKey, UniqueConstraint, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Completion(Base):
    __tablename__ = "completions"

    __table_args__ = (
        UniqueConstraint(
            "habit_id",
            "completed_on",
            name="uq_habit_completion_date",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid.uuid4,
    )

    habit_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        ForeignKey("habits.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    completed_on: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    habit: Mapped["Habit"] = relationship(
        back_populates="completions",
    )
